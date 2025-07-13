import React from "react";

// مكون Input الأساسي
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return (
    <input
      ref={ref}
      className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
});
Input.displayName = "Input";

// مكون Textarea القابل لإعادة الاستخدام
export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => {
  return (
    <textarea
      ref={ref}
      className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
