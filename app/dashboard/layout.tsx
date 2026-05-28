import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#060D1A] flex">
      <DashboardSidebar />
      <div className="flex-1 ml-64 min-h-screen">
        {children}
      </div>
    </div>
  );
}
