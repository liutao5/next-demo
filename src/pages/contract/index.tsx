import MainLayout from "@/layouts/MainLayout";

Contract.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default function Contract() {
  return <>contract</>;
}
