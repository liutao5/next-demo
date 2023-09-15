import DashboardLayout from "@/layouts/dashboard";

SettingPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function SettingPage() {
  return <>Reconcile</>;
}
