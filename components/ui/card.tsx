// components/ui/card.tsx

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl shadow-sm border border-gray-200 bg-white transition-all hover:shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = {
  children: ReactNode;
  className?: string;
};

export function CardHeader({ children, className }: CardHeaderProps) {
  return <div className={cn("p-4 border-b border-gray-100", className)}>{children}</div>;
}

type CardContentProps = {
  children: ReactNode;
  className?: string;
};

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

type CardTitleProps = {
  children: ReactNode;
  className?: string;
};

export function CardTitle({ children, className }: CardTitleProps) {
  return <h3 className={cn("text-lg font-semibold", className)}>{children}</h3>;
}
