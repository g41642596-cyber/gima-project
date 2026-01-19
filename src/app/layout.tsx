import type { Metadata } from "next";
import { Archivo, Michroma } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { SidebarProvider } from "./components/sidebarContext";
import ClientLayout from "./components/clientLayout";

const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", display: "swap" });
const michroma = Michroma({ weight: "400", subsets: ["latin"], variable: "--font-michroma", display: "swap" });

export const metadata: Metadata = { title: "GIMA Project", description: "Dashboard" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${archivo.variable} ${michroma.variable} bg-slate-50 flex min-h-screen antialiased overflow-hidden`}>
        <SidebarProvider>
          <Sidebar />
          <ClientLayout>
            <Header />
            <main className="p-6 md:p-8 flex-1 overflow-y-auto h-[calc(100vh-5rem)]">
              <div className="max-w-7xl mx-auto pb-20">
                {children}
              </div>
            </main>
          </ClientLayout>
        </SidebarProvider>
      </body>
    </html>
  );
}