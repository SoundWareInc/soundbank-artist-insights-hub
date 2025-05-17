
import { ReactNode } from 'react';

export interface DateRange {
  from: Date;
  to: Date;
  preset: string; // Changed from optional to required
}

export interface AnalyticsDashboardProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  initialDateRange?: DateRange;
  onDateRangeChange?: (dateRange: DateRange) => void;
}
