
import { useState, useMemo } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";

interface SoundPack {
  id: string;
  name: string;
  releaseDate: Date;
  soundCount: number;
  streams: number;
  likes: number;
  purchases: number;
}

interface SoundPacksTableProps {
  searchQuery: string;
  dateRange: {
    from: Date;
    to: Date;
    preset: string;
  };
}

export const SoundPacksTable = ({ searchQuery, dateRange }: SoundPacksTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof SoundPack;
    direction: "ascending" | "descending";
  }>({
    key: "streams",
    direction: "descending",
  });

  // Mock data
  const mockSoundPacks: SoundPack[] = useMemo(() => [
    {
      id: "1",
      name: "Bass Essentials",
      releaseDate: new Date("2023-10-01"),
      soundCount: 48,
      streams: 124567,
      likes: 8341,
      purchases: 2567,
    },
    {
      id: "2",
      name: "Synthwave Collection",
      releaseDate: new Date("2023-11-01"),
      soundCount: 36,
      streams: 98932,
      likes: 6876,
      purchases: 1412,
    },
    {
      id: "3",
      name: "Lofi Beats",
      releaseDate: new Date("2023-09-01"),
      soundCount: 64,
      streams: 145678,
      likes: 9210,
      purchases: 3821,
    },
    {
      id: "4",
      name: "Acoustic Sessions",
      releaseDate: new Date("2024-01-01"),
      soundCount: 32,
      streams: 78765,
      likes: 5245,
      purchases: 1298,
    },
    {
      id: "5",
      name: "Trap Essentials",
      releaseDate: new Date("2023-12-01"),
      soundCount: 56,
      streams: 156789,
      likes: 12321,
      purchases: 4932,
    },
    {
      id: "6",
      name: "Cinematic Textures",
      releaseDate: new Date("2023-08-01"),
      soundCount: 42,
      streams: 83456,
      likes: 4765,
      purchases: 1387,
    },
  ], []);

  const requestSort = (key: keyof SoundPack) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredSoundPacks = useMemo(() => {
    return mockSoundPacks
      .filter((pack) => {
        const query = searchQuery.toLowerCase();
        return pack.name.toLowerCase().includes(query);
      })
      .filter((pack) => {
        return pack.releaseDate >= dateRange.from && pack.releaseDate <= dateRange.to;
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
  }, [mockSoundPacks, searchQuery, dateRange, sortConfig]);

  const formatNumber = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
  };

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-[#333] hover:bg-transparent">
            <TableHead 
              className="text-white cursor-pointer"
              onClick={() => requestSort("name")}
            >
              <div className="flex items-center">
                Name
                {sortConfig.key === "name" && (
                  sortConfig.direction === "ascending" ? 
                  <ArrowUp className="ml-1 h-4 w-4" /> : 
                  <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="text-white cursor-pointer"
              onClick={() => requestSort("releaseDate")}
            >
              <div className="flex items-center">
                Release Date
                {sortConfig.key === "releaseDate" && (
                  sortConfig.direction === "ascending" ? 
                  <ArrowUp className="ml-1 h-4 w-4" /> : 
                  <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead 
              className="text-white cursor-pointer text-right"
              onClick={() => requestSort("soundCount")}
            >
              <div className="flex items-center justify-end">
                Sounds
                {sortConfig.key === "soundCount" && (
                  sortConfig.direction === "ascending" ? 
                  <ArrowUp className="ml-1 h-4 w-4" /> : 
                  <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
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
              onClick={() => requestSort("purchases")}
            >
              <div className="flex items-center justify-end">
                Purchases
                {sortConfig.key === "purchases" && (
                  sortConfig.direction === "ascending" ? 
                  <ArrowUp className="ml-1 h-4 w-4" /> : 
                  <ArrowDown className="ml-1 h-4 w-4" />
                )}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredSoundPacks.length > 0 ? (
            filteredSoundPacks.map((pack) => (
              <TableRow 
                key={pack.id} 
                className="border-b border-[#333] hover:bg-[#2A2A2A]"
              >
                <TableCell className="font-medium text-white">{pack.name}</TableCell>
                <TableCell className="text-gray-300">
                  {format(pack.releaseDate, "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right text-white">{pack.soundCount}</TableCell>
                <TableCell className="text-right text-white">{formatNumber(pack.streams)}</TableCell>
                <TableCell className="text-right text-white">{formatNumber(pack.likes)}</TableCell>
                <TableCell className="text-right text-white">{formatNumber(pack.purchases)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                No sound packs found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
