"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid, Layout, FileMinus } from "@deemlol/next-icons";

export interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ size?: number; color?: string }>;
}

const navItems: NavItem[] = [
  { name: "Competitions", href: "/", icon: Grid },
  // { name: "Scoreboards", href: "#", icon: Layout },
  // { name: "Scoresheets", href: "#", icon: FileMinus },
];

export default function SideNav() {
  const path = usePathname() ?? "/";

  return (
    <aside className="flex flex-col space-y-10 px-4 py-4 bg-white border-r border-gray-300 h-screen overflow-hidden">
      <div className="flex items-center mb-4">
        <Link
          href="/"
          aria-label="Go to ChayaJudge"
          title="ChayaJudge"
          className="w-full text-xl pl-2 font-bold text-blue-500"
        >
          ChayaJudge
        </Link>
      </div>
      <div className="flex flex-col grow w-full">
        {navItems.map(({ name, href, icon: Icon }) => {
          const isActive = path == href;

          return (
            <Link
              key={name}
              href={href}
              aria-label={name}
              title={name}
              className={`inline-flex gap-2 items-center text-sm cursor-pointer transition-all ease-in duration-75 w-full rounded-md px-2 py-2 ${
                isActive
                  ? "bg-blue-50 text-black"
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
              }`}
            >
              {Icon && <Icon size={16} color="var(--color-gray-500)" />}
              {name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
