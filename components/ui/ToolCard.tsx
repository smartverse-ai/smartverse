"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
}

export default function ToolCard({ title, description, href }: ToolCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group block bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-500 transition-all duration-200"
      )}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-600 mb-2 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <div className="mt-4 text-sm text-blue-600 font-medium group-hover:underline">
          جرّب الأداة →
        </div>
      </div>
    </Link>
  );
}
