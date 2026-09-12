"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { ApiError, unwrap } from "@/shared/api/http";
import type {
  AlternativeSlot,
  Appointment,
  AppointmentAttendee,
  AppointmentListFilter,
  AppointmentSegment,
  Booking,
  BookingItem,
  CalendarBlock,
  CancelBookingRequest,
  CreateAvailabilityHoldRequest,
  CreateBookingItemRequest,
  CreateCalendarBlockRequest,
  CreateHoldResult,
  CreateWaitlistEntryRequest,
  IssueBookingAccessTokenRequest,
  IssueBookingAccessTokenResult,
  RescheduleAppointmentRequest,
  UpdateAppointmentRequest,
  UpdateBookingItemRequest,
  WaitlistEntry,
} from "./types";

/** SchedulingConflictException's 409 body is `{message, alternatives}` —
 * ApiError carries the raw body through so a caller that wants the
 * alternative slots (not just the message) can pull them out. */
export function getConflictAlternatives(
  error: unknown,
): AlternativeSlot[] | null {
  if (!(error instanceof ApiError) || error.status !== 409) return null;
  const body = error.body;
  if (!body || typeof body !== "object") return null;
  const alternatives = (body as { alternatives?: unknown }).alternatives;
  return Array.isArray(alternatives)
    ? (alternatives as AlternativeSlot[])
    : null;
}

export const schedulingKeys = {
  appointments: ["appointments"] as const,
  appointmentsFiltered: (filter: AppointmentListFilter) =>
    ["appointments", filter] as const,
  appointment: (appointmentId: string) =>
    ["appointments", appointmentId] as const,
  appointmentSegments: (appointmentId: string) =>
    ["appointments", appointmentId, "segments"] as const,
  appointmentAttendees: (appointmentId: string) =>
    ["appointments", appointmentId, "attendees"] as const,
  appointmentBooking: (appointmentId: string) =>
    ["appointments", appointmentId, "booking"] as const,
  bookings: ["bookings"] as const,
  booking: (bookingId: string) => ["bookings", bookingId] as const,
  bookingItems: (bookingId: string) =>
    ["bookings", bookingId, "items"] as const,
};

export function useAppointmentsQuery(filter: AppointmentListFilter = {}) {
  return useQuery({
    queryKey: schedulingKeys.appointmentsFiltered(filter),
    queryFn: () =>
      unwrap<Appointment[]>(
        apiClient.get("appointments", {
          searchParams: filter as Record<string, string>,
        }),
      ),
  });
}

export function useAppointmentQuery(appointmentId: string) {
  return useQuery({
    queryKey: schedulingKeys.appointment(appointmentId),
    queryFn: () =>
      unwrap<Appointment>(apiClient.get(`appointments/${appointmentId}`)),
    enabled: Boolean(appointmentId),
  });
}

export function useAppointmentSegmentsQuery(appointmentId: string) {
  return useQuery({
    queryKey: schedulingKeys.appointmentSegments(appointmentId),
    queryFn: () =>
      unwrap<AppointmentSegment[]>(
        apiClient.get(`appointments/${appointmentId}/segments`),
      ),
    enabled: Boolean(appointmentId),
  });
}

export function useAppointmentAttendeesQuery(appointmentId: string) {
  return useQuery({
    queryKey: schedulingKeys.appointmentAttendees(appointmentId),
    queryFn: () =>
      unwrap<AppointmentAttendee[]>(
        apiClient.get(`appointments/${appointmentId}/attendees`),
      ),
    enabled: Boolean(appointmentId),
  });
}

export function useAppointmentBookingQuery(appointmentId: string) {
  return useQuery({
    queryKey: schedulingKeys.appointmentBooking(appointmentId),
    queryFn: () =>
      unwrap<{ booking: Booking; items: BookingItem[] }>(
        apiClient.get(`appointments/${appointmentId}/booking`),
      ),
    enabled: Boolean(appointmentId),
  });
}

export function useUpdateAppointmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      appointmentId,
      body,
    }: {
      appointmentId: string;
      body: UpdateAppointmentRequest;
    }) =>
      unwrap<Appointment>(
        apiClient.patch(`appointments/${appointmentId}`, { json: body }),
      ),
    onSuccess: (_data, { appointmentId }) => {
      queryClient.invalidateQueries({
        queryKey: schedulingKeys.appointment(appointmentId),
      });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.appointments });
    },
  });
}

export function useRescheduleAppointmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      appointmentId,
      body,
    }: {
      appointmentId: string;
      body: RescheduleAppointmentRequest;
    }) =>
      unwrap<Appointment>(
        apiClient.post(`appointments/${appointmentId}/reschedule`, {
          json: body,
        }),
      ),
    onSuccess: (_data, { appointmentId }) => {
      queryClient.invalidateQueries({
        queryKey: schedulingKeys.appointment(appointmentId),
      });
      queryClient.invalidateQueries({
        queryKey: schedulingKeys.appointmentBooking(appointmentId),
      });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.appointments });
    },
  });
}

export function useBookingsQuery() {
  return useQuery({
    queryKey: schedulingKeys.bookings,
    queryFn: () => unwrap<Booking[]>(apiClient.get("bookings")),
  });
}

export function useBookingQuery(bookingId: string) {
  return useQuery({
    queryKey: schedulingKeys.booking(bookingId),
    queryFn: () => unwrap<Booking>(apiClient.get(`bookings/${bookingId}`)),
    enabled: Boolean(bookingId),
  });
}

export function useBookingItemsQuery(bookingId: string) {
  return useQuery({
    queryKey: schedulingKeys.bookingItems(bookingId),
    queryFn: () =>
      unwrap<BookingItem[]>(apiClient.get(`bookings/${bookingId}/items`)),
    enabled: Boolean(bookingId),
  });
}

export function useCreateHoldMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateAvailabilityHoldRequest) =>
      unwrap<CreateHoldResult>(apiClient.post("bookings", { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: schedulingKeys.bookings });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.appointments });
    },
  });
}

export function useConfirmBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookingId: string) =>
      unwrap<Booking>(apiClient.post(`bookings/${bookingId}/confirm`)),
    onSuccess: (_data, bookingId) => {
      queryClient.invalidateQueries({
        queryKey: schedulingKeys.booking(bookingId),
      });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.bookings });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.appointments });
    },
  });
}

export function useCancelBookingMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bookingId,
      body,
    }: {
      bookingId: string;
      body?: CancelBookingRequest;
    }) =>
      unwrap<Booking>(
        apiClient.post(`bookings/${bookingId}/cancel`, { json: body ?? {} }),
      ),
    onSuccess: (_data, { bookingId }) => {
      queryClient.invalidateQueries({
        queryKey: schedulingKeys.booking(bookingId),
      });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.bookings });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.appointments });
    },
  });
}

export function useAddBookingItemMutation(bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateBookingItemRequest) =>
      unwrap<BookingItem>(
        apiClient.post(`bookings/${bookingId}/items`, { json: body }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: schedulingKeys.bookingItems(bookingId),
      });
      queryClient.invalidateQueries({
        queryKey: schedulingKeys.booking(bookingId),
      });
      queryClient.invalidateQueries({ queryKey: schedulingKeys.appointments });
    },
  });
}

export function useCancelBookingItemMutation(bookingId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (itemId: string) => {
      const body: UpdateBookingItemRequest = { status: "canceled" };
      return unwrap<BookingItem>(
        apiClient.patch(`bookings/${bookingId}/items/${itemId}`, {
          json: body,
        }),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: schedulingKeys.bookingItems(bookingId),
      });
      queryClient.invalidateQueries({
        queryKey: schedulingKeys.booking(bookingId),
      });
    },
  });
}

export function useIssueBookingAccessTokenMutation() {
  return useMutation({
    mutationFn: ({
      bookingId,
      body,
    }: {
      bookingId: string;
      body?: IssueBookingAccessTokenRequest;
    }) =>
      unwrap<IssueBookingAccessTokenResult>(
        apiClient.post(`bookings/${bookingId}/access-tokens`, {
          json: body ?? {},
        }),
      ),
  });
}

export function useCalendarBlocksQuery() {
  return useQuery({
    queryKey: ["calendar-blocks"] as const,
    queryFn: () => unwrap<CalendarBlock[]>(apiClient.get("calendar-blocks")),
  });
}

export function useCreateCalendarBlockMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateCalendarBlockRequest) =>
      unwrap<CalendarBlock>(apiClient.post("calendar-blocks", { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendar-blocks"] });
    },
  });
}

export const waitlistKeys = {
  all: ["waitlist-entries"] as const,
};

export function useWaitlistEntriesQuery() {
  return useQuery({
    queryKey: waitlistKeys.all,
    queryFn: () => unwrap<WaitlistEntry[]>(apiClient.get("waitlist-entries")),
  });
}

export function useCreateWaitlistEntryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateWaitlistEntryRequest) =>
      unwrap<WaitlistEntry>(apiClient.post("waitlist-entries", { json: body })),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: waitlistKeys.all });
    },
  });
}
