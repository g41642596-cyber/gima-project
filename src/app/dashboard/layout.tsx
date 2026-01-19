import { Sidebar } from "@/components/ui/Sidebar"
// import from "@/components/ui/Sidebar"
// import {Sidebar} from "@/components/ui/xd"
import type React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      {/* <Sidebar /> */}
      <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
    </div>
  )
}
