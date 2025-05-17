
import { useState, useMemo } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { format } from "date-fns";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface Sound {
  id: string;
  name: string;
  soundPack: string;
  releaseDate: Date;
  streams: number;
  likes: number;
  purchases: number;
}

interface SoundsTableProps {
  searchQuery: string;
  dateRange: {
    from: Date;
    to: Date;
    preset: string;
  };
}

export const SoundsTable = ({ searchQuery, dateRange }: SoundsTableProps) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Sound;
    direction: "ascending" | "descending";
  }>({
    key: "streams",
    direction: "descending",
  });

  // Mock data
  const mockSounds: Sound[] = useMemo(() => [
    {
      id: "1",
      name: "Deep Bass Drop",
      soundPack: "Bass Essentials",
      releaseDate: new Date("2023-10-15"),
      streams: 34567,
      likes: 2341,
      purchases: 567,
    },
    {
      id: "2",
      name: "Analog Synth Lead",
      soundPack: "Synthwave Collection",
      releaseDate: new Date("2023-11-02"),
      streams: 28932,
      likes: 1876,
      purchases: 412,
    },
    {
      id: "3",
      name: "Lofi Drum Kit",
      soundPack: "Lofi Beats",
      releaseDate: new Date("2023-09-21"),
      streams: 45678,
      likes: 3210,
      purchases: 821,
    },
    {
      id: "4",
      name: "Acoustic Guitar Strum",
      soundPack: "Acoustic Sessions",
      releaseDate: new Date("2024-01-10"),
      streams: 18765,
      likes: 1245,
      purchases: 298,
    },
    {
      id: "5",
      name: "808 Kick Pattern",
      soundPack: "Trap Essentials",
      releaseDate: new Date("2023-12-05"),
      streams: 56789,
      likes: 4321,
      purchases: 932,
    },
    {
      id: "6",
      name: "Ambient Pad",
      soundPack: "Cinematic Textures",
      releaseDate: new Date("2023-08-28"),
      streams: 23456,
      likes: 1765,
      purchases: 387,
    },
    {
      id: "7",
      name: "Electric Piano Loop",
      soundPack: "Jazz Fundamentals",
      releaseDate: new Date("2024-02-15"),
      streams: 12345,
      likes: 987,
      purchases: 246,
    },
    {
      id: "8",
      name: "House Vocal Chop",
      soundPack: "EDM Vocals",
      releaseDate: new Date("2023-11-18"),
      streams: 32109,
      likes: 2134,
      purchases: 532,
    },
  ], []);

  const requestSort = (key: keyof Sound) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredSounds = useMemo(() => {
    return mockSounds
      .filter((sound) => {
        const query = searchQuery.toLowerCase();
        return (
          sound.name.toLowerCase().includes(query) ||
          sound.soundPack.toLowerCase().includes(query)
        );
      })
      .filter((sound) => {
        return sound.releaseDate >= dateRange.from && sound.releaseDate <= dateRange.to;
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
  }, [mockSounds, searchQuery, dateRange, sortConfig]);

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
              onClick={() => requestSort("soundPack")}
            >
              <div className="flex items-center">
                Sound Pack
                {sortConfig.key === "soundPack" && (
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
          {filteredSounds.length > 0 ? (
            filteredSounds.map((sound) => (
              <TableRow 
                key={sound.id} 
                className="border-b border-[#333] hover:bg-[#2A2A2A]"
              >
                <TableCell className="font-medium text-white">{sound.name}</TableCell>
                <TableCell className="text-gray-300">{sound.soundPack}</TableCell>
                <TableCell className="text-gray-300">
                  {format(sound.releaseDate, "MMM dd, yyyy")}
                </TableCell>
                <TableCell className="text-right text-white">{formatNumber(sound.streams)}</TableCell>
                <TableCell className="text-right text-white">{formatNumber(sound.likes)}</TableCell>
                <TableCell className="text-right text-white">{formatNumber(sound.purchases)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-400">
                No sounds found matching your criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
