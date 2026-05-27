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
  type?: "button" | "submit";
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  type = "button",
  fullWidth = false,
  disabled,
  onClick,
  className,
  children,
}: Props) {
  const cls = cn(
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className,
  );
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} disabled={disabled} onClick={onClick} className={cls}>{children}</button>;
}
