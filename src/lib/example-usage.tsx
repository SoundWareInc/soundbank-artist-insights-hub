
import React, { useState } from 'react';
import { AnalyticsDashboard, DateRange } from './index';

export const ExampleUsage = () => {
  const [currentDateRange, setCurrentDateRange] = useState<DateRange | null>(null);
  
  const handleDateRangeChange = (dateRange: DateRange) => {
    setCurrentDateRange(dateRange);
    console.log('Date range changed:', dateRange);
  };

  return (
    <div>
      <AnalyticsDashboard 
        title="My Custom Analytics"
        description="Visualize your app's performance metrics"
        onDateRangeChange={handleDateRangeChange}
      />
    </div>
  );
};
