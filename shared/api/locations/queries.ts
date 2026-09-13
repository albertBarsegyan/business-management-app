"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/api/client";
import { unwrap } from "@/shared/api/http";
import type { Location } from "./types";

export function useLocationsQuery() {
  return useQuery({
    queryKey: ["locations"],
    queryFn: () => unwrap<Location[]>(apiClient.get("locations")),
  });
}
