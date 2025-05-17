import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";

const presets = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "7days" },
  { label: "Last 30 days", value: "30days" },
  { label: "This week", value: "thisWeek" },
  { label: "This month", value: "thisMonth" },
  { label: "Custom range", value: "custom" },
];

interface DateRangePickerProps {
  dateRange: {
    from: Date;
    to: Date;
    preset: string;
  };
  setDateRange: (dateRange: { from: Date; to: Date; preset: string }) => void;
}

export function DateRangePicker({ dateRange, setDateRange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectPreset = (preset: string) => {
    const now = new Date();
    let from = new Date();
    let to = new Date();

    switch (preset) {
      case "today":
        // Keep from and to as today
        break;
      case "yesterday":
        from = new Date(now);
        from.setDate(from.getDate() - 1);
        to = new Date(from);
        break;
      case "7days":
        from = new Date(now);
        from.setDate(from.getDate() - 7);
        break;
      case "30days":
        from = new Date(now);
        from.setDate(from.getDate() - 30);
        break;
      case "thisWeek":
        from = new Date(now);
        from.setDate(from.getDate() - from.getDay());
        break;
      case "thisMonth":
        from = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "custom":
        // Keep the current range, just switch to custom mode
        setIsOpen(true);
        setDateRange({ ...dateRange, preset });
        return;
    }

    setDateRange({ from, to, preset });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Select value={dateRange.preset} onValueChange={handleSelectPreset}>
        <SelectTrigger className="w-[180px] bg-[#2A2A2A] border-[#444] text-white">
          <SelectValue placeholder="Select time period" />
        </SelectTrigger>
        <SelectContent className="bg-[#2A2A2A] border-[#444] text-white">
          {presets.map((preset) => (
            <SelectItem key={preset.value} value={preset.value}>
              {preset.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {dateRange.preset === "custom" && (
        <div className="flex gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal bg-[#2A2A2A] border-[#444] text-white hover:bg-[#333]",
                  !dateRange.from && "text-gray-400"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#2A2A2A] border-[#444]" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange.from}
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to, preset: "custom" });
                    setIsOpen(false);
                  }
                }}
                numberOfMonths={2}
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
