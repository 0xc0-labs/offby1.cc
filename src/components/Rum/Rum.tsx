"use client";

import { useEffect } from "react";
import { initRum } from "@0xc0-labs/observability/rum";

export function Rum({
  enabled,
  version,
  environment,
}: {
  enabled: boolean;
  version: string;
  environment: string;
}) {
  useEffect(() => {
    initRum({ service: "offby1-cc", version, environment, enabled });
  }, [enabled, version, environment]);
  return null;
}
