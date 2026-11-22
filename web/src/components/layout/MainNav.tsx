"use client";

import { usePathname } from "next/navigation";
import { NavMenus } from "./NavMenus";

/** Client wrapper: knows the current path so the menu can mark the current page. */
export function MainNav() {
  return <NavMenus currentPath={usePathname() ?? "/"} />;
}
