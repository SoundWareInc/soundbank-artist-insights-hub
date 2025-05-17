
# Analytics Dashboard Component Library

An easy-to-integrate analytics dashboard with charts, metrics, and data tables for React applications.

## Features

- Interactive charts with date filtering
- Key metrics display with selectable views
- Detailed data tables for in-depth analysis
- Fully responsive design
- Customizable UI elements

## Usage

```jsx
import { AnalyticsDashboard } from '@your-org/analytics-dashboard';
import '@your-org/analytics-dashboard/styles.css'; // If you export styles

function App() {
  const handleDateRangeChange = (dateRange) => {
    console.log('Date range changed:', dateRange);
  };

  return (
    <AnalyticsDashboard 
      title="My Analytics Dashboard"
      description="Track your app performance"
      onDateRangeChange={handleDateRangeChange}
    />
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| title | string | Dashboard title |
| description | string | Dashboard description |
| initialDateRange | DateRange | Initial date range to display |
| onDateRangeChange | function | Callback when date range changes |

## Types

```typescript
interface DateRange {
  from: Date;
  to: Date;
  preset?: string;
}

interface AnalyticsDashboardProps {
  title?: string;
  description?: string;
  initialDateRange?: DateRange;
  onDateRangeChange?: (dateRange: DateRange) => void;
}
```

## Integration Guide

To integrate this dashboard into your React application:

1. Import the component
2. Add it to your React component tree
3. Customize props as needed
4. Handle any callbacks for data updates

For custom data sources, refer to the documentation on how to provide your own data adapters.
