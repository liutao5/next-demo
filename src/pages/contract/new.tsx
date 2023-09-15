import DashboardLayout from "@/layouts/dashboard";

ContractCreatPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);
export default function ContractCreatPage() {
  return <>new</>;
}
