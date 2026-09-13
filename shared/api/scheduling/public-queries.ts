"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import type { Booking, BookingItem, RescheduleBookingRequest } from "./types";

/**
 * Hooks for the no-account customer flow: viewing/canceling/rescheduling an
 * existing booking via a booking access token (issued by staff through
 * POST /bookings/:id/access-tokens), not a staff cookie session. The token
 * is carried as an explicit header rather than a cookie, matching the
 * x-booking-access-token scheme the backend's BookingAccessGuard expects.
 */

export const publicBookingKeys = {
  me: (accessToken: string) => ["public-bookings", "me", accessToken] as const,
};

export function usePublicBookingQuery(accessToken: string | null) {
  return useQuery({
    queryKey: publicBookingKeys.me(accessToken ?? ""),
    queryFn: () =>
      unwrap<{ booking: Booking; items: BookingItem[] }>(
        apiClient.get("public/bookings/me", {
          headers: { "x-booking-access-token": accessToken ?? "" },
        }),
      ),
    enabled: Boolean(accessToken),
  });
}

export function useCancelPublicBookingMutation(accessToken: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reasonCode?: string) =>
      unwrap<Booking>(
        apiClient.post("public/bookings/me/cancel", {
          headers: { "x-booking-access-token": accessToken ?? "" },
          json: { reasonCode },
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: publicBookingKeys.me(accessToken ?? ""),
      });
    },
  });
}

export function useReschedulePublicBookingMutation(accessToken: string | null) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: RescheduleBookingRequest) =>
      unwrap<Booking>(
        apiClient.post("public/bookings/me/reschedule", {
          headers: { "x-booking-access-token": accessToken ?? "" },
          json: body,
        }),
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: publicBookingKeys.me(accessToken ?? ""),
      });
    },
  });
}
