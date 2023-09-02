import DashboardLayout from "@/layouts/dashboard";

Reconcile.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Reconcile() {
  return <>Reconcile</>;
}
