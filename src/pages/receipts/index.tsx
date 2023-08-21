import MainLayout from "@/layouts/MainLayout";

Receipts.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default function Receipts() {
  return <>Receipts</>;
}
