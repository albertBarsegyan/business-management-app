/**
 * Hand-written types for the scheduling endpoints (appointments + bookings),
 * standing in until the backend's OpenAPI spec is exported and
 * openapi-typescript generates shared/api/generated/schema.d.ts (see
 * business-management-infra CLAUDE.md §3).
 */

export type AppointmentKind = "private" | "group";
export type AppointmentStatus =
  | "tentative"
  | "confirmed"
  | "checked_in"
  | "in_progress"
  | "completed"
  | "canceled"
  | "no_show";

export interface Appointment {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  locationId: string;
  serviceVariantId: string | null;
  kind: AppointmentKind;
  titleSnapshot: string;
  startsAt: string;
  endsAt: string;
  timezoneSnapshot: string;
  capacity: number;
  onlineCapacity: number | null;
  status: AppointmentStatus;
  customerVisibleNote: string | null;
  internalNote: string | null;
  confirmedAt: string | null;
  checkedInAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  canceledAt: string | null;
  cancellationReasonCode: string | null;
}

export type AppointmentSegmentKind = "active" | "processing" | "buffer";

export interface AppointmentSegment {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  appointmentId: string;
  position: number;
  name: string;
  startsAt: string;
  endsAt: string;
  kind: AppointmentSegmentKind;
  requiresStaff: boolean;
}

export type AppointmentAttendeeStatus =
  | "reserved"
  | "confirmed"
  | "checked_in"
  | "completed"
  | "late_canceled"
  | "no_show"
  | "canceled";

export interface AppointmentAttendee {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  appointmentId: string;
  bookingItemId: string;
  clientId: string | null;
  guestName: string | null;
  status: AppointmentAttendeeStatus;
  checkedInAt: string | null;
  notes: string | null;
}

export type BookingChannel =
  | "staff"
  | "public_site"
  | "widget"
  | "marketplace"
  | "import"
  | "api"
  | "walk_in";
export type BookingStatus =
  | "draft"
  | "held"
  | "pending_payment"
  | "pending_confirmation"
  | "confirmed"
  | "partially_completed"
  | "completed"
  | "canceled"
  | "expired";
export type BookingProviderPreference = "any" | "specific" | "no_preference";

export interface Booking {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  locationId: string | null;
  bookingNumber: string;
  clientId: string | null;
  channel: BookingChannel;
  status: BookingStatus;
  providerPreference: BookingProviderPreference;
  preferredTeamMemberId: string | null;
  partySize: number;
  customerNote: string | null;
  internalNote: string | null;
  currencyCode: string;
  subtotalMinor: string;
  discountMinor: string;
  taxMinor: string;
  totalMinor: string;
  depositRequiredMinor: string;
  policySnapshot: Record<string, unknown>;
  pricingVersion: number | null;
  holdExpiresAt: string | null;
  confirmedAt: string | null;
  completedAt: string | null;
  canceledAt: string | null;
  cancellationReasonCode: string | null;
  canceledByType: string | null;
  createdByMembershipId: string | null;
}

export type BookingItemStatus = "pending" | "active" | "completed" | "canceled";

export interface BookingItem {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  bookingId: string;
  serviceVariantId: string;
  appointmentId: string | null;
  quantity: number;
  status: BookingItemStatus;
  serviceNameSnapshot: string;
  variantNameSnapshot: string | null;
  durationMinutesSnapshot: number;
  unitPriceMinor: string;
  currencyCode: string;
  discountMinor: string;
  taxMinor: string;
  lineTotalMinor: string;
  requestedTeamMemberId: string | null;
  notes: string | null;
  position: number;
}

export type BookingAccessTokenPurpose = "view" | "manage";
export type BookingAccessTokenStatus = "active" | "revoked" | "expired";

export interface BookingAccessToken {
  id: string;
  venueId: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  bookingId: string;
  purpose: BookingAccessTokenPurpose;
  status: BookingAccessTokenStatus;
  expiresAt: string;
  lastUsedAt: string | null;
}

export interface AlternativeSlot {
  startsAt: string;
  endsAt: string;
}

export interface CreateAvailabilityHoldRequest {
  locationId: string;
  serviceVariantId: string;
  teamMemberId: string;
  startsAt: string;
  clientId?: string;
  channel?: BookingChannel;
  customerNote?: string;
}

export interface CreateHoldResult {
  booking: Booking;
  appointment: Appointment;
  hold: { id: string; expiresAt: string };
  holdToken: string;
}

export interface CancelBookingRequest {
  reasonCode?: string;
}

export interface IssueBookingAccessTokenRequest {
  purpose?: BookingAccessTokenPurpose;
}

export interface IssueBookingAccessTokenResult {
  token: BookingAccessToken;
  rawToken: string;
}

export interface UpdateAppointmentRequest {
  status?: AppointmentStatus;
  internalNote?: string;
  customerVisibleNote?: string;
}

export interface RescheduleAppointmentRequest {
  newStartsAt: string;
}

export interface CreateBookingItemRequest {
  serviceVariantId: string;
  teamMemberId: string;
  startsAt: string;
  quantity?: number;
}

export interface UpdateBookingItemRequest {
  status: "canceled";
}

export interface RescheduleBookingRequest {
  newStartsAt: string;
}

export interface AppointmentListFilter {
  teamMemberId?: string;
  from?: string;
  to?: string;
}

export type CalendarBlockKind = "break" | "time_off" | "external" | "other";

export interface CalendarBlock {
  id: string;
  locationId: string | null;
  kind: CalendarBlockKind;
  title: string;
  startsAt: string;
  endsAt: string;
  source: string;
}

export interface CreateCalendarBlockRequest {
  teamMemberIds: string[];
  locationId?: string;
  kind: CalendarBlockKind;
  title: string;
  startsAt: string;
  endsAt: string;
}

export type WaitlistEntryStatus =
  "waiting" | "offered" | "booked" | "expired" | "withdrawn";

export interface WaitlistEntry {
  id: string;
  clientId: string;
  serviceVariantId: string;
  locationId: string | null;
  preferredTeamMemberId: string | null;
  earliestAt: string;
  latestAt: string;
  partySize: number;
  priority: number;
  status: WaitlistEntryStatus;
}

export interface CreateWaitlistEntryRequest {
  clientId: string;
  serviceVariantId: string;
  locationId?: string;
  preferredTeamMemberId?: string;
  earliestAt: string;
  latestAt: string;
  partySize?: number;
  priority?: number;
}
