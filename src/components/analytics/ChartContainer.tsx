
import { useState, useEffect } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from "recharts";
import { format, subDays, eachDayOfInterval } from "date-fns";

interface ChartContainerProps {
  selectedMetric: string;
  dateRange: {
    from: Date;
    to: Date;
    preset: string;
  };
}

export const ChartContainer = ({ selectedMetric, dateRange }: ChartContainerProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  
  useEffect(() => {
    // Generate mock data based on date range and selected metric
    const { from, to } = dateRange;
    
    const days = eachDayOfInterval({ start: from, end: to });
    
    const mockData = days.map(day => {
      let value;
      switch(selectedMetric) {
        case "streams":
          value = Math.floor(Math.random() * 1000) + 500;
          break;
        case "likes":
          value = Math.floor(Math.random() * 300) + 50;
          break;
        case "purchases":
          value = Math.floor(Math.random() * 50) + 5;
          break;
        case "credits":
          value = Math.floor(Math.random() * 500) + 100;
          break;
        case "cashouts":
          value = Math.floor(Math.random() * 200) + 20;
          break;
        case "users":
          value = Math.floor(Math.random() * 400) + 100;
          break;
        case "rank":
          // For rank, lower is better
          value = Math.floor(Math.random() * 20) + 1;
          break;
        default:
          value = Math.floor(Math.random() * 1000);
      }
      
      return {
        date: format(day, "MMM dd"),
        [selectedMetric]: value
      };
    });
    
    setChartData(mockData);
  }, [selectedMetric, dateRange]);

  const getChartLineColor = () => {
    switch(selectedMetric) {
      case "streams": return "#33C3F0";
      case "likes": return "#E74694";
      case "purchases": return "#9b87f5";
      case "credits": return "#F7B801";
      case "cashouts": return "#10B981";
      case "users": return "#8B5CF6";
      case "rank": return "#EC4899";
      default: return "#9b87f5";
    }
  };

  // Updated formatter to ensure it always returns a string
  const formatYAxisTick = (value: number): string => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString(); // Explicitly convert to string
  };

  const getMetricDisplayName = (metric: string) => {
    switch(metric) {
      case "streams": return "Streams";
      case "likes": return "Likes";
      case "purchases": return "Purchases";
      case "credits": return "Credits Earned";
      case "cashouts": return "Dollars Cashed Out";
      case "users": return "Users Engaged";
      case "rank": return "Artist Rank";
      default: return metric;
    }
  };

  return (
    <div className="h-80">
      <h3 className="text-lg font-medium mb-4 text-white/90">
        {getMetricDisplayName(selectedMetric)} Over Time
      </h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="date" 
            stroke="#888" 
            tick={{ fill: '#888' }} 
          />
          <YAxis 
            stroke="#888" 
            tick={{ fill: '#888' }} 
            tickFormatter={formatYAxisTick}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#2A2A2A', 
              border: 'none', 
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              color: '#FFF' 
            }} 
          />
          <Legend />
          <Line
            type="monotone"
            dataKey={selectedMetric}
            stroke={getChartLineColor()}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            name={getMetricDisplayName(selectedMetric)}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
