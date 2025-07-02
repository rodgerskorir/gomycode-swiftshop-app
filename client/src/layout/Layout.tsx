import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 py-6 md:px-8 md:py-10 min-h-screen">
      {children}
    </div>
  );
}
