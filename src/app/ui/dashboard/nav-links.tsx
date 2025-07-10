"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/category", label: "Category" },
  { href: "/dashboard/laporan", label: "Laporan" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex-1 space-y-4 text-gray-900">
      {navLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={clsx(
              "block py-2 px-4 rounded hover:bg-gray-400",
              pathname === link.href && "bg-gray-400"
            )}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
