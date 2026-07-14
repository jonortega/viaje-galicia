import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: IconName;
  action?: { href: string; label: string };
}

export function PageHeader({
  eyebrow,
  title,
  description,
  icon,
  action,
}: PageHeaderProps) {
  return (
    <header className="flex items-end justify-between gap-4 px-5 pb-5 pt-7 sm:px-8 sm:pt-10">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-[#147d76]">
          <Icon name={icon} className="size-4" />
          {eyebrow}
        </div>
        <h1 className="text-3xl font-black tracking-[-.04em] text-[#0b3157] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-[#60717c] sm:text-base">
          {description}
        </p>
      </div>
      {action ? (
        <Link
          href={action.href}
          className="hidden min-h-11 shrink-0 items-center rounded-full bg-[#0b3157] px-5 text-sm font-bold text-white transition-colors hover:bg-[#147d76] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#147d76] sm:flex"
        >
          {action.label}
        </Link>
      ) : null}
    </header>
  );
}
