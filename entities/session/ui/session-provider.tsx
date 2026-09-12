"use client";

import { createContext, useContext } from "react";
import type { SessionUser } from "../model/get-current-user";

/**
 * The sidebar (and other client components) need the signed-in user's
 * display data, but it's mounted from ~13 different screen compositions
 * (`PageShell` alone is reused by 9 of them). Threading a `user` prop
 * through every one of those would ripple across the whole app; a context
 * seeded once here — from the single `requireUser()` call already made in
 * `app/(zhamo)/layout.tsx` — avoids that. This is exactly the pattern
 * described in the Next.js auth guide's "Context Providers" section
 * (`node_modules/next/dist/docs/.../authentication.md`): safe here because
 * every consumer (`SidebarNav`, etc.) is already a Client Component, not a
 * Server Component that would render before the provider's value exists.
 */
const SessionUserContext = createContext<SessionUser | null>(null);

export function SessionProvider({
  user,
  children,
}: {
  user: SessionUser;
  children: React.ReactNode;
}) {
  return (
    <SessionUserContext.Provider value={user}>
      {children}
    </SessionUserContext.Provider>
  );
}

/** Only valid inside `app/(zhamo)/layout.tsx`'s subtree, where it's always set. */
export function useSessionUser(): SessionUser {
  const user = useContext(SessionUserContext);
  if (!user) {
    throw new Error("useSessionUser() called outside <SessionProvider>");
  }
  return user;
}
