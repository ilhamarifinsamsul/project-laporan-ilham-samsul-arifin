import SidebarNav from "@/app/ui/dashboard/sidebar-nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SidebarNav />
      </div>
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
