// app/sign-up/[[...sign-up]]/page.tsx

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl border shadow-md p-6">
        <h1 className="text-center text-2xl font-bold text-blue-700 mb-6">
          إنشاء حساب جديد في SmartVerse
        </h1>

        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/"
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition",
              card: "shadow-none",
              headerTitle: "text-blue-700 text-lg font-semibold",
            },
            variables: {
              colorPrimary: "#2563eb",
              borderRadius: "8px",
            },
          }}
        />
      </div>
    </div>
  );
}
