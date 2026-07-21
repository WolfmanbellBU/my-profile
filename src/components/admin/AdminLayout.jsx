import { Outlet } from "react-router-dom"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export function AdminLayout() {
  return (
    <div className="flex min-h-svh w-full bg-white">
      <AdminSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  )
}
