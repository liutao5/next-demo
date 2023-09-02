import DashboardLayout from "@/layouts/dashboard";
import Home from "./home";

export default function Index() {
  return (
    <DashboardLayout>
      <Home />
    </DashboardLayout>
  );
}

// Index.getLayout = function getLayout(page: React.ReactElement) {
//   return <MainLayout>{page}</MainLayout>;
// };
