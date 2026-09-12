"use client";

import { useMemo, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { ApiError, unwrap } from "@/shared/api/http";
import {
  useClientContactsQuery,
  useClientsQuery,
} from "@/shared/api/clients/queries";
import { catalogKeys, useServicesQuery } from "@/shared/api/catalog/queries";
import type { ServiceVariant } from "@/shared/api/catalog/types";
import { useLocationsQuery } from "@/shared/api/locations/queries";
import {
  getConflictAlternatives,
  useAddBookingItemMutation,
  useAppointmentBookingQuery,
  useAppointmentQuery,
  useCancelBookingItemMutation,
  useCancelBookingMutation,
  useConfirmBookingMutation,
  useCreateHoldMutation,
  useIssueBookingAccessTokenMutation,
  useRescheduleAppointmentMutation,
  useUpdateAppointmentMutation,
} from "@/shared/api/scheduling/queries";
import type {
  AlternativeSlot,
  AppointmentStatus,
} from "@/shared/api/scheduling/types";
import { useTeamMembersQuery } from "@/shared/api/team/queries";
import { PANEL_STATUSES, STATUS_LABELS } from "./types";

function formatMinor(priceMinor: string, currencyCode: string): string {
  const major = Number(priceMinor) / 100;
  return `${major.toLocaleString()} ${currencyCode}`;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours} h`;
  return `${hours} h ${mins} min`;
}

function toDatetimeLocalValue(iso: string): string {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromDatetimeLocalValue(value: string): string {
  return new Date(value).toISOString();
}

function formatDisplayDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface ServiceOption {
  variantId: string;
  serviceId: string;
  label: string;
  meta: string;
  price: string;
  durationMinutes: number;
}

export function useAppointmentPanel({
  appointmentId,
  onRequestClose,
  onAppointmentSaved,
}: {
  appointmentId: string | null;
  onRequestClose: () => void;
  onAppointmentSaved?: (appointmentId: string) => void;
}) {
  const mode: "new" | "edit" = appointmentId ? "edit" : "new";

  const [locationId, setLocationId] = useState("");
  const [teamMemberId, setTeamMemberId] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState("");
  const [startsAtLocal, setStartsAtLocal] = useState("");
  const [notes, setNotes] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [conflictAlternatives, setConflictAlternatives] = useState<
    AlternativeSlot[] | null
  >(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [newItemVariantId, setNewItemVariantId] = useState("");
  const [newItemTeamMemberId, setNewItemTeamMemberId] = useState("");

  const locationsQuery = useLocationsQuery();
  const teamQuery = useTeamMembersQuery();
  const clientsQuery = useClientsQuery();
  const servicesQuery = useServicesQuery();
  const activeServices = useMemo(
    () => (servicesQuery.data ?? []).filter((s) => s.status === "active"),
    [servicesQuery.data],
  );
  const variantQueries = useQueries({
    queries: activeServices.map((service) => ({
      queryKey: catalogKeys.variants(service.id),
      queryFn: () =>
        unwrap<ServiceVariant[]>(
          apiClient.get(`services/${service.id}/variants`),
        ),
    })),
  });
  const serviceOptions: ServiceOption[] = [];
  activeServices.forEach((service, i) => {
    const variants = (variantQueries[i]?.data ?? []).filter(
      (v) => v.status === "active",
    );
    for (const variant of variants) {
      serviceOptions.push({
        variantId: variant.id,
        serviceId: service.id,
        label: variant.name
          ? `${service.name} — ${variant.name}`
          : service.name,
        meta: formatDuration(variant.durationMinutes),
        price: formatMinor(variant.priceMinor, variant.currencyCode),
        durationMinutes: variant.durationMinutes,
      });
    }
  });

  const appointmentQuery = useAppointmentQuery(appointmentId ?? "");
  const bookingQuery = useAppointmentBookingQuery(appointmentId ?? "");
  const booking = bookingQuery.data?.booking ?? null;
  const bookingItems = bookingQuery.data?.items ?? [];
  const bookingId = booking?.id ?? "";

  const selectedClientContactsQuery = useClientContactsQuery(
    selectedClientId ?? booking?.clientId ?? "",
  );

  const createHold = useCreateHoldMutation();
  const confirmBooking = useConfirmBookingMutation();
  const cancelBooking = useCancelBookingMutation();
  const updateAppointment = useUpdateAppointmentMutation();
  const rescheduleAppointment = useRescheduleAppointmentMutation();
  const issueAccessToken = useIssueBookingAccessTokenMutation();
  const addItem = useAddBookingItemMutation(bookingId);
  const cancelItem = useCancelBookingItemMutation(bookingId);

  const clientMatches = useMemo(() => {
    const term = clientSearch.trim().toLowerCase();
    const clients = clientsQuery.data ?? [];
    if (!term) return clients.slice(0, 5);
    return clients
      .filter((c) => c.displayName.toLowerCase().includes(term))
      .slice(0, 5);
  }, [clientsQuery.data, clientSearch]);

  const activeClientId = selectedClientId ?? booking?.clientId ?? null;
  const selectedClient = activeClientId
    ? ((clientsQuery.data ?? []).find((c) => c.id === activeClientId) ?? null)
    : null;

  async function onSave() {
    setFormError(null);
    setConflictAlternatives(null);
    if (!locationId || !teamMemberId || !selectedVariantId || !startsAtLocal) {
      setFormError("Pick a location, team member, service, and time.");
      return;
    }
    try {
      const hold = await createHold.mutateAsync({
        locationId,
        serviceVariantId: selectedVariantId,
        teamMemberId,
        startsAt: fromDatetimeLocalValue(startsAtLocal),
        clientId: selectedClientId ?? undefined,
        customerNote: notes || undefined,
      });
      await confirmBooking.mutateAsync(hold.booking.id);
      setToastMessage(
        `Saved · ${formatDisplayDateTime(hold.appointment.startsAt)}`,
      );
      onAppointmentSaved?.(hold.appointment.id);
    } catch (error) {
      const alternatives = getConflictAlternatives(error);
      if (alternatives) {
        setConflictAlternatives(alternatives);
        return;
      }
      setFormError(
        error instanceof ApiError
          ? error.message
          : "Couldn't save this appointment.",
      );
    }
  }

  async function onSelectStatus(status: AppointmentStatus) {
    if (!appointmentId) return;
    try {
      await updateAppointment.mutateAsync({ appointmentId, body: { status } });
    } catch (error) {
      setFormError(
        error instanceof ApiError ? error.message : "Couldn't update status.",
      );
    }
  }

  async function onReschedule() {
    if (!appointmentId || !startsAtLocal) return;
    setFormError(null);
    setConflictAlternatives(null);
    try {
      const result = await rescheduleAppointment.mutateAsync({
        appointmentId,
        body: { newStartsAt: fromDatetimeLocalValue(startsAtLocal) },
      });
      setToastMessage(
        `Rescheduled · ${formatDisplayDateTime(result.startsAt)}`,
      );
    } catch (error) {
      const alternatives = getConflictAlternatives(error);
      if (alternatives) {
        setConflictAlternatives(alternatives);
        return;
      }
      setFormError(
        error instanceof ApiError ? error.message : "Couldn't reschedule.",
      );
    }
  }

  function onPickAlternative(slot: AlternativeSlot) {
    setStartsAtLocal(toDatetimeLocalValue(slot.startsAt));
    setConflictAlternatives(null);
  }

  async function onCancelAppointment() {
    if (!booking) return;
    try {
      await cancelBooking.mutateAsync({ bookingId: booking.id, body: {} });
      setToastMessage("Appointment canceled");
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? error.message
          : "Couldn't cancel this appointment.",
      );
    }
  }

  /**
   * Lets staff hand a no-account customer a self-service link (view/cancel/
   * reschedule via /manage-booking?token=...) instead of alert()-ing the raw
   * token per audit.md A13's precedent — this hook already has a toast for
   * exactly this kind of confirmation.
   */
  async function onIssueAccessToken() {
    if (!booking) return;
    try {
      const { rawToken } = await issueAccessToken.mutateAsync({
        bookingId: booking.id,
      });
      const link = `${window.location.origin}/manage-booking?token=${rawToken}`;
      try {
        await navigator.clipboard.writeText(link);
        setToastMessage("Self-service link copied to clipboard");
      } catch {
        setToastMessage(link);
      }
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? error.message
          : "Couldn't create a self-service link.",
      );
    }
  }

  async function onAddCartItem() {
    if (!booking || !newItemVariantId || !newItemTeamMemberId) return;
    const anchor = appointmentQuery.data?.endsAt ?? new Date().toISOString();
    try {
      await addItem.mutateAsync({
        serviceVariantId: newItemVariantId,
        teamMemberId: newItemTeamMemberId,
        startsAt: anchor,
      });
      setNewItemVariantId("");
      setNewItemTeamMemberId("");
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? error.message
          : "Couldn't add this service.",
      );
    }
  }

  async function onRemoveCartItem(itemId: string) {
    try {
      await cancelItem.mutateAsync(itemId);
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? error.message
          : "Couldn't remove this service.",
      );
    }
  }

  function onClose() {
    onRequestClose();
  }

  const isEdit = mode === "edit";
  const appointment = appointmentQuery.data ?? null;
  const isLoading =
    isEdit && (appointmentQuery.isPending || bookingQuery.isPending);
  const notFound = isEdit && appointmentQuery.isError;

  const headerTitle = isEdit
    ? (selectedClient?.displayName ?? "Appointment")
    : "New appointment";
  const headerMeta = isEdit
    ? appointment
      ? `${formatDisplayDateTime(appointment.startsAt)} – ${formatDisplayDateTime(appointment.endsAt)}`
      : ""
    : "Pick a time below";
  const footerTitle = isEdit ? "Edit appointment" : "New appointment";
  const cartTotalMinor = bookingItems
    .filter((item) => item.status !== "canceled")
    .reduce((sum, item) => sum + BigInt(item.lineTotalMinor || "0"), BigInt(0));
  const footerMeta = isEdit
    ? booking
      ? `${booking.bookingNumber} · ${formatMinor(cartTotalMinor.toString(), booking.currencyCode)}`
      : ""
    : selectedVariantId
      ? (serviceOptions.find((o) => o.variantId === selectedVariantId)?.meta ??
        "")
      : "";

  return {
    mode,
    isEdit,
    isLoading,
    notFound,
    headerTitle,
    headerMeta,
    recordLabel: booking?.bookingNumber ?? null,
    footerTitle,
    footerMeta,

    status: appointment?.status ?? null,
    statusOptions: PANEL_STATUSES,
    statusLabels: STATUS_LABELS,
    onSelectStatus,
    isStatusSaving: updateAppointment.isPending,

    locations: locationsQuery.data ?? [],
    locationId,
    setLocationId,
    teamMembers: teamQuery.data ?? [],
    teamMemberId,
    setTeamMemberId,
    startsAtLocal,
    setStartsAtLocal,
    notes,
    setNotes,
    onReschedule,
    isRescheduling: rescheduleAppointment.isPending,

    clientSearch,
    setClientSearch,
    clientMatches,
    selectedClient,
    selectedClientPhone: selectedClientContactsQuery.data?.find(
      (c) => c.type === "phone",
    )?.valueDisplay,
    selectedClientEmail: selectedClientContactsQuery.data?.find(
      (c) => c.type === "email",
    )?.valueDisplay,
    onSelectClient: setSelectedClientId,

    serviceOptions,
    selectedVariantId,
    setSelectedVariantId,
    cartItems: bookingItems.filter((item) => item.status !== "canceled"),
    onRemoveCartItem,
    newItemVariantId,
    setNewItemVariantId,
    newItemTeamMemberId,
    setNewItemTeamMemberId,
    onAddCartItem,
    isAddingItem: addItem.isPending,
    cartTotal: formatMinor(
      cartTotalMinor.toString(),
      booking?.currencyCode ?? "AMD",
    ),

    conflictAlternatives,
    onPickAlternative,

    toastMessage,
    clearToast: () => setToastMessage(null),
    formError,

    onSave,
    isSaving: createHold.isPending || confirmBooking.isPending,
    onCancelAppointment,
    isCanceling: cancelBooking.isPending,
    onIssueAccessToken,
    isIssuingAccessToken: issueAccessToken.isPending,
    onClose,
  };
}

export type AppointmentPanelState = ReturnType<typeof useAppointmentPanel>;
