import type { LucideIcon } from "lucide-react";

interface IconBadgeProps {
  icon: LucideIcon;
  size?: "md" | "lg";
  className?: string;
}

const sizes = {
  md: { box: "h-12 w-12 rounded-xl", icon: "h-5 w-5" },
  lg: { box: "h-16 w-16 rounded-2xl", icon: "h-7 w-7" },
};

export function IconBadge({ icon: Icon, size = "md", className = "" }: IconBadgeProps) {
  const s = sizes[size];
  return (
    <div
      className={`flex shrink-0 items-center justify-center border border-brand-300/25 bg-gradient-to-br from-brand-300/15 to-tamrix-elevated text-brand-300 shadow-glow ${s.box} ${className}`}
    >
      <Icon className={s.icon} strokeWidth={1.75} />
    </div>
  );
}
