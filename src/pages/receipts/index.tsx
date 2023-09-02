import DashboardLayout from "@/layouts/dashboard";

Receipts.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function Receipts() {
  return <>Receipts</>;
}
