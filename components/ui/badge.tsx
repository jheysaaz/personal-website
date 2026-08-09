import type { JSX } from "preact";
import { cn } from "@/lib/utils.ts";

const badgeVariants = {
  default:
    "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
  secondary:
    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
  destructive:
    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
  outline: "text-foreground",
} as const;

export type BadgeVariant = keyof typeof badgeVariants;

export interface BadgeProps
  extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "class"> {
  variant?: BadgeVariant;
  class?: string;
}

export function Badge(
  { variant = "default", class: className, ...props }: BadgeProps,
) {
  return (
    <div
      class={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        badgeVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
