import { Sidebar } from "@/components/ui/Sidebar"; 
import { SidebarProvider } from "@/components/ui/sidebarContext"; 
// import Header from "@/components/ui/header"; //
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        
        <div className="flex-1 flex flex-col h-full w-full overflow-hidden">
          
          {/* <Header />  */}
          
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}