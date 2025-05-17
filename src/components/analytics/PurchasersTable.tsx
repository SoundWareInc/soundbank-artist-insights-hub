
import { useState, useMemo } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Purchaser {
  id: string;
  name: string;
  avatar: string;
  streams: number;
  likes: number;
  creditsPaid: number;
  lastPurchase: Date;
}

interface PurchasersTableProps {
  searchQuery: string;
  dateRange: {
    from: Date;
    to: Date;
    preset: string;
  };
}

export const PurchasersTable = ({ searchQuery, dateRange }: PurchasersTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Purchaser;
    direction: "ascending" | "descending";
  }>({
    key: "creditsPaid",
    direction: "descending",
  });

  // Mock data
  const mockPurchasers: Purchaser[] = useMemo(() => [
    {
      id: "1",
      name: "John Producer",
      avatar: "",
      streams: 3245,
      likes: 567,
      creditsPaid: 890,
      lastPurchase: new Date("2023-12-28"),
    },
    {
      id: "2",
      name: "Sarah Beats",
      avatar: "",
      streams: 4567,
      likes: 789,
      creditsPaid: 1200,
      lastPurchase: new Date("2024-01-15"),
    },
    {
      id: "3",
      name: "DJ MixMaster",
      avatar: "",
      streams: 6543,
      likes: 1234,
      creditsPaid: 2100,
      lastPurchase: new Date("2024-02-02"),
    },
    {
      id: "4",
      name: "Alex Waveform",
      avatar: "",
      streams: 2345,
      likes: 432,
      creditsPaid: 560,
      lastPurchase: new Date("2023-11-18"),
    },
    {
      id: "5",
      name: "Chris Harmonics",
      avatar: "",
      streams: 8765,
      likes: 1876,
      creditsPaid: 2800,
      lastPurchase: new Date("2024-01-25"),
    },
    {
      id: "6",
      name: "Jamie Synth",
      avatar: "",
      streams: 5432,
      likes: 986,
      creditsPaid: 1500,
      lastPurchase: new Date("2023-12-12"),
    },
    {
      id: "7",
      name: "Taylor Rhythm",
      avatar: "",
      streams: 3876,
      likes: 765,
      creditsPaid: 950,
      lastPurchase: new Date("2024-01-05"),
    },
    {
      id: "8",
      name: "Morgan Beats",
      avatar: "",
      streams: 7654,
      likes: 1654,
      creditsPaid: 2400,
      lastPurchase: new Date("2024-02-10"),
    },
  ], []);

  const requestSort = (key: keyof Purchaser) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredPurchasers = useMemo(() => {
    return mockPurchasers
      .filter((purchaser) => {
        const query = searchQuery.toLowerCase();
        return purchaser.name.toLowerCase().includes(query);
      })
      .filter((purchaser) => {
        return purchaser.lastPurchase >= dateRange.from && purchaser.lastPurchase <= dateRange.to;
      })
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
  }, [mockPurchasers, searchQuery, dateRange, sortConfig]);

  const formatNumber = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#333] hover:bg-transparent">
            <TableHead className="text-white">User</TableHead>
            <TableHead 
              className="text-white cursor-pointer text-right"
              onClick={() => requestSort("streams")}
            >
              <div className="flex items-center justify-end">
                Streams
                {sortConfig.key === "streams" && (
                  sortConfig.direction === "ascending" ? 
                  <ArrowUp className="ml-1 h-4 w-4" /> : 
                  <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="text-white cursor-pointer text-right"
              onClick={() => requestSort("likes")}
            >
              <div className="flex items-center justify-end">
                Likes
                {sortConfig.key === "likes" && (
                  sortConfig.direction === "ascending" ? 
                  <ArrowUp className="ml-1 h-4 w-4" /> : 
                  <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="text-white cursor-pointer text-right"
              onClick={() => requestSort("creditsPaid")}
            >
              <div className="flex items-center justify-end">
                Credits Paid
                {sortConfig.key === "creditsPaid" && (
                  sortConfig.direction === "ascending" ? 
                  <ArrowUp className="ml-1 h-4 w-4" /> : 
                  <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPurchasers.length > 0 ? (
            filteredPurchasers.map((purchaser) => (
              <TableRow 
                key={purchaser.id} 
                className="border-b border-[#333] hover:bg-[#2A2A2A]"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3 bg-[#9b87f5]">
                      <AvatarImage src={purchaser.avatar} alt={purchaser.name} />
                      <AvatarFallback>{getInitials(purchaser.name)}</AvatarFallback>
                    </Avatar>
                    <span className="text-white">{purchaser.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right text-white">{formatNumber(purchaser.streams)}</TableCell>
                <TableCell className="text-right text-white">{formatNumber(purchaser.likes)}</TableCell>
                <TableCell className="text-right text-white font-medium">{formatNumber(purchaser.creditsPaid)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-400">
                No purchasers found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
