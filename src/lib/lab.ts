// The email-obfuscation lab (/lab/email-obfuscation/*): pages that show, behind
// the real Cloudflare edge, how Email Obfuscation interacts with a nonce-based
// CSP and with React's hydration. Research for 0xc0-labs/offby1.cc#27.

export type LabVariant = "strict" | "hydration" | "isolated";

/** A placeholder address: Email Obfuscation rewrites anything shaped like one. */
export const LAB_EMAIL = "nobody@example.com";

/** The marker the probe sets on <html> before React hydrates. */
export const LAB_MARKER = "set-before-hydration";

/**
 * Inline, with the CSP nonce, at the top of the page: it runs while the HTML
 * is parsed, before React's scripts. It marks <html>, and records every CSP
 * violation and every console error from then on in window.__lab, outside
 * React, so a rebuilt page still has them.
 */
export const LAB_PROBE = `(function(){var l=window.__lab={csp:[],errors:[],t0:performance.now()};document.documentElement.setAttribute("data-lab-marker","${LAB_MARKER}");document.addEventListener("securitypolicyviolation",function(e){l.csp.push({directive:e.effectiveDirective,blocked:e.blockedURI,at:Math.round(performance.now()-l.t0)})});var ce=console.error;console.error=function(){try{l.errors.push({message:Array.prototype.map.call(arguments,function(a){return a&&a.message?a.message:String(a)}).join(" ").slice(0,400),at:Math.round(performance.now()-l.t0)})}catch(e){}return ce.apply(console,arguments)};window.addEventListener("error",function(e){l.errors.push({message:String(e.message).slice(0,400),at:Math.round(performance.now()-l.t0)})})})();`;
