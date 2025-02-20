import MainLayout from "@/components/layout/main-layout";
import HomeHeader from "../components/home-header";
import MetricsOverview from "../components/metrics-overview";
import LinkedBanks from "../components/linked-banks";
export default function HomeView() {
  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <HomeHeader />
        {/* Metrics Overview */}
        <MetricsOverview />
        {/* Linked Banks Section */}
        <LinkedBanks />
      </div>
    </MainLayout>
  );
}
