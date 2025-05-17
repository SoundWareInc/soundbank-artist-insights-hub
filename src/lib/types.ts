
import { ReactNode } from 'react';

export interface DateRange {
  from: Date;
  to: Date;
  preset?: string;
}

export interface AnalyticsDashboardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  initialDateRange?: DateRange;
  onDateRangeChange?: (dateRange: DateRange) => void;
}
