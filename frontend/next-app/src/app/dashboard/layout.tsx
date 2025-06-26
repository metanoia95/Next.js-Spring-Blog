'use client'
import SideBar from "@/components/dashboard/sidebar/Sidebar";


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 flex-row min-h-0">
        <SideBar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
