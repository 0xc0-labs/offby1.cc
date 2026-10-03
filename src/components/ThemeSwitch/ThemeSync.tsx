"use client";

import { useEffect } from "react";
import { restoreTheme } from "@/lib/theme";

export function ThemeSync() {
  useEffect(restoreTheme, []);
  return null;
}
