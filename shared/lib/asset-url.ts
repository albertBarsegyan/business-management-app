/**
 * Every uploaded image (avatars, Phase 4; builder hero/gallery/logo/etc.,
 * Phase 5) is served directly by the backend, not proxied through this
 * app's own /api/* routes — see CLAUDE.md §3's Phase 4 note. Safe to call
 * from both Server and Client Components: `NEXT_PUBLIC_*` vars are inlined
 * at build time either way.
 */
export function assetUrl(assetId: string): string {
  return `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/api/v1/assets/${assetId}`;
}
