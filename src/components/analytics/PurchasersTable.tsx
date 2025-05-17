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

  // Enhanced mock data with 50 entries
  const mockPurchasers: Purchaser[] = useMemo(() => {
    // Name elements for realistic user names
    const firstNames = ["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Emily", "Emma", "Olivia", "Ava", "Isabella", "Sophia", "Mia", "Charlotte", "Amelia", "Harper", "Evelyn", "Abigail", "DJ", "Producer", "Beat", "Mix", "Master"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson", "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores", "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts"];
    const nicknames = ["Beat", "Mix", "Loops", "Audio", "Sound", "Music", "Flow", "Rhythm", "Wave", "Bass", "Drum", "Track", "Master", "Studio", "Pro", "Creator"];
    
    // Generate 50 purchasers with varied data
    return Array.from({ length: 50 }, (_, i) => {
      // Generate name
      const useNickname = Math.random() > 0.7;
      let name;
      
      if (useNickname) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
        name = `${firstName} "${nickname}"`;
      } else {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        name = `${firstName} ${lastName}`;
      }
      
      // Randomize last purchase date in the last 90 days
      const daysAgo = Math.floor(Math.random() * 90);
      const lastPurchase = new Date();
      lastPurchase.setDate(lastPurchase.getDate() - daysAgo);
      
      // Calculate engagement level (some users are much more engaged than others)
      const engagementLevel = Math.pow(Math.random(), 1.5) * 0.7 + 0.3; // Skew towards higher engagement
      
      // Generate metrics based on engagement
      const baseCredits = Math.floor((Math.random() * 8000 + 500) * engagementLevel);
      // Users who spend more tend to stream and like more
      const streamsPerCreditFactor = (Math.random() * 4) + 1; // How much they stream relative to spending
      const likesPerCreditFactor = (Math.random() * 0.8) + 0.2; // How much they like relative to spending
      
      const creditsPaid = Math.max(50, Math.floor(baseCredits));
      const streams = Math.max(100, Math.floor(creditsPaid * streamsPerCreditFactor));
      const likes = Math.max(10, Math.floor(creditsPaid * likesPerCreditFactor));
      
      return {
        id: (i + 1).toString(),
        name,
        avatar: "", // No avatar URLs for mock data
        streams,
        likes,
        creditsPaid,
        lastPurchase,
      };
    });
  }, []);

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
