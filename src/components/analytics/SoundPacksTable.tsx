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

  // Enhanced mock data with 50 entries
  const mockSoundPacks: SoundPack[] = useMemo(() => {
    // Sound pack name elements
    const genres = ["Bass", "Trap", "Lofi", "Hip Hop", "Jazz", "R&B", "EDM", "Techno", "House", "Ambient", "Cinematic", "Pop", "Rock", "Acoustic", "Folk", "Synthwave", "Future", "Orchestral", "Experimental", "Funk"];
    const descriptors = ["Essentials", "Collection", "Toolkit", "Elements", "Sessions", "Textures", "Fundamentals", "Masters", "Foundations", "Suite", "Series", "Box", "Library", "Archive", "Samples", "Loops", "Percussion", "Drums", "Melodies", "FX"];
    
    // Generate 50 sound packs with varied data
    return Array.from({ length: 50 }, (_, i) => {
      // Randomize release date in the last 3 years
      const daysAgo = Math.floor(Math.random() * 1095);
      const releaseDate = new Date();
      releaseDate.setDate(releaseDate.getDate() - daysAgo);
      
      // Generate pack name
      const genre = genres[Math.floor(Math.random() * genres.length)];
      const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
      const name = `${genre} ${descriptor}`;
      
      // Generate number of sounds in the pack (between 8 and 128)
      const soundCount = Math.floor(Math.random() * 120) + 8;
      
      // Calculate a base popularity factor (older packs may have had more time to accumulate metrics)
      const ageFactor = Math.max(0.4, Math.min(1.5, (1095 - daysAgo) / 500));
      const popularityBase = Math.random() * 0.7 + 0.3; // 0.3 to 1.0 base popularity
      const popularity = popularityBase * ageFactor;
      
      // Generate metrics based on popularity and size of pack
      const packSizeFactor = Math.sqrt(soundCount / 40); // Adjust metrics based on pack size
      
      const baseStreams = Math.floor((Math.random() * 400000 + 50000) * popularity * packSizeFactor);
      const baseLikes = Math.floor((Math.random() * 30000 + 2000) * popularity * packSizeFactor);
      const basePurchases = Math.floor((Math.random() * 8000 + 500) * popularity * packSizeFactor);
      
      // Add some randomness to each metric
      const streams = Math.max(1000, Math.floor(baseStreams * (0.85 + Math.random() * 0.3)));
      const likes = Math.max(100, Math.floor(baseLikes * (0.8 + Math.random() * 0.4)));
      const purchases = Math.max(50, Math.floor(basePurchases * (0.75 + Math.random() * 0.5)));
      
      return {
        id: (i + 1).toString(),
        name,
        releaseDate,
        soundCount,
        streams,
        likes,
        purchases,
      };
    });
  }, []);

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
