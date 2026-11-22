"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The contact address, assembled in the browser so it is never plain text in the HTML (plan §12).
 * Without JavaScript, or before hydration, it reads "info (at) thejetlagchronicles.com".
 */
export function ContactEmail({ user, domain }: { user: string; domain: string }) {
  const inBrowser = useSyncExternalStore(subscribe, () => true, () => false);
  if (!inBrowser) {
    return (
      <span>
        {user} (at) {domain}
      </span>
    );
  }
  const address = [user, domain].join("@");
  return <a href={`mailto:${address}`}>{address}</a>;
}
