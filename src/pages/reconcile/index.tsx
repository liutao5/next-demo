import MainLayout from "@/layouts/MainLayout";

Reconcile.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default function Reconcile() {
  return <>Reconcile</>;
}
