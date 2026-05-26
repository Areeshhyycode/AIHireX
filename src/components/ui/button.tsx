import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "bg-slate-900 text-white hover:bg-slate-800",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
  outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: Props) {
  const cls = cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
    variants[variant],
    sizes[size],
    className,
  );
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls}>{children}</button>;
}
