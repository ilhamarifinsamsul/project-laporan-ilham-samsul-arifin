"use client";

import { DocumentIcon, HomeIcon, TagIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
  {
    href: "/dashboard/category",
    label: "Category",
    icon: TagIcon,
  },
  { href: "/dashboard/laporan", label: "Laporan", icon: DocumentIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex-1 space-y-4 text-gray-900">
      {navLinks.map((link) => {
        const LinkIcon = link.icon;
        return (
          <li key={link.label}>
            <Link
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-100 		 hover:text-gray-600 md:flex-none md:justify-start md:p-2 md:px-3 text-",
                pathname === link.href && "bg-gray-400"
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.label}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
