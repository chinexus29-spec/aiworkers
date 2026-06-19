"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Boxes,
  Users,
  User,
} from "lucide-react";



export default function BottomNav() {
  const pathname = usePathname();

  if ( pathname === "/login" || pathname === "/register" ) { return null; }

  const links = [
    {
      href: "/",
      label: "Home",
      icon: Home,
    },
    {
      href: "/products",
      label: "Products",
      icon: Boxes,
    },
    {
      href: "/team",
      label: "Team",
      icon: Users,
    },
    {
      href: "/mine",
      label: "Mine",
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
      <div className="w-full max-w-[430px] bg-black border-t border-gray-800 h-16 flex">
        {links.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center transition-colors ${
                active
                  ? "text-blue-500"
                  : "text-gray-200"
              }`}
            >
              {active && (
                <div className="absolute top-0 w-8 h-1 bg-blue-500 rounded-full" />
              )}

              <Icon size={20} />

              <span className="text-xs mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}