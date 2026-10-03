"use client";

import { useEffect } from "react";
import { openobserveRum } from "@openobserve/browser-rum";

// Same origin, so connect-src stays 'self': gitops routes /rum/v1/default/rum
// to OpenObserve.
function intake({ path, parameters }: { path: string; parameters: string }) {
  return `${window.location.origin}${path}?${parameters}`;
}

let started = false;

/** Nothing stored on the visitor's browser and no session replay, so no consent banner is needed. */
export function Rum({ clientToken }: { clientToken?: string }) {
  useEffect(() => {
    if (!clientToken || started) return;
    started = true;
    openobserveRum.init({
      applicationId: "offby1-cc",
      clientToken,
      site: window.location.host,
      organizationIdentifier: "default",
      proxy: intake,
      service: "offby1-cc",
      env: "production",
      sessionSampleRate: 100,
      sessionReplaySampleRate: 0,
      sessionPersistence: "memory",
      trackAnonymousUser: false,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
    });
  }, [clientToken]);
  return null;
}
