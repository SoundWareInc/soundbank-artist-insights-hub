
import { useState } from "react";
import { ChartContainer } from "@/components/analytics/ChartContainer";
import { MetricBillboards } from "@/components/analytics/MetricBillboards";
import { DataTables } from "@/components/analytics/DataTables";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DateRangePicker } from "@/components/analytics/DateRangePicker";

const Analytics = () => {
  // Set default date range to last 30 days
  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);
  
  const [selectedMetric, setSelectedMetric] = useState("streams");
  const [dateRange, setDateRange] = useState({
    from: thirtyDaysAgo,
    to: today,
    preset: "30days"
  });

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your performance and engagement</p>
        </header>

        <div className="flex flex-col lg:flex-row justify-between items-start mb-6">
          <h2 className="text-xl font-semibold mb-4 lg:mb-0">Performance Overview</h2>
          <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
        </div>

        <div className="bg-[#1D1D1D] rounded-lg p-4 mb-8 shadow-lg">
          <ChartContainer selectedMetric={selectedMetric} dateRange={dateRange} />
        </div>

        <MetricBillboards 
          selectedMetric={selectedMetric} 
          setSelectedMetric={setSelectedMetric}
          dateRange={dateRange}
        />

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-6">Detailed Analytics</h2>
          <div className="bg-[#1D1D1D] rounded-lg p-4 shadow-lg">
            <DataTables dateRange={dateRange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
