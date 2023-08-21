import MainLayout from "@/layouts/MainLayout";
import Home from "./home";

export default function Index() {
  return <Home />;
}

Index.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
