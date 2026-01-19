"use client";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden relative transition-all duration-300">
      {children}
    </div>
  );
}