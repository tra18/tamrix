import { Suspense } from "react";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  return (
    <Suspense fallback={<p className="p-8 text-center text-tamrix-muted">Chargement...</p>}>
      <AdminDashboard />
    </Suspense>
  );
}
