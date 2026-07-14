"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/Icon";
import { cn } from "@/lib/cn";

const items: Array<{ href: string; label: string; icon: IconName }> = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/mapa", label: "Mapa", icon: "map" },
  { href: "/itinerario", label: "Itinerario", icon: "calendar" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-[1000] mx-auto border-t border-white/70 bg-[#fffdf7]/95 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_35px_rgba(11,49,87,.12)] backdrop-blur md:bottom-5 md:max-w-sm md:rounded-[1.65rem] md:border"
    >
      <div className="grid grid-cols-3 gap-1">
        {items.map((item) => {
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-2 text-[.68rem] font-bold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76]",
                active
                  ? "bg-[#e4f1ec] text-[#0b3157]"
                  : "text-[#66747f] hover:bg-[#f4efe4] hover:text-[#0b3157]",
              )}
            >
              <Icon
                name={item.icon}
                className={cn(
                  "size-[1.35rem] transition-transform group-hover:-translate-y-0.5",
                  active && "text-[#147d76]",
                )}
                strokeWidth={active ? 2.25 : 1.8}
              />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
