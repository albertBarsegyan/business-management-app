/** Joins the parts of a location's address that are actually set. */
export function formatAddress(location: {
  addressLine1: string | null;
  addressLine2?: string | null;
  city: string | null;
  region?: string | null;
}): string | null {
  const parts = [
    location.addressLine1,
    location.addressLine2,
    location.city,
    location.region,
  ].filter((part): part is string => Boolean(part && part.trim()));
  return parts.length > 0 ? parts.join(", ") : null;
}
