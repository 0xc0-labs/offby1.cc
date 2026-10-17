"use client";

import { useEffect } from "react";
import { initRum } from "@0xc0-labs/observability/rum";

export function Rum({
  clientToken,
  version,
  environment,
}: {
  clientToken?: string;
  version: string;
  environment: string;
}) {
  useEffect(() => {
    initRum({ service: "offby1-cc", clientToken, version, environment });
  }, [clientToken, version, environment]);
  return null;
}
