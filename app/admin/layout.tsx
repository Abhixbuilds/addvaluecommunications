import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060D1A] flex">
      <AdminSidebar />
      <div className="flex-1 ml-64 min-h-screen">{children}</div>
    </div>
  );
}
