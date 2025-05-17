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

  // Enhanced mock data with 50 entries
  const mockSounds: Sound[] = useMemo(() => {
    // Sound name patterns
    const prefixes = ["Deep", "Mellow", "Crisp", "Smooth", "Heavy", "Light", "Tech", "Urban", "Jazzy", "Raw", "Classic", "Neo", "Future", "Retro", "Ambient", "Dark", "Bright", "Funky", "Chill", "Upbeat"];
    const types = ["Bass", "Kick", "Snare", "Hi-Hat", "Loop", "Sample", "Synth", "Pad", "Lead", "Drum", "Vocal", "FX", "Chord", "Melody", "Beat", "Arp", "Riser", "Drop", "Atmosphere", "Texture"];
    
    // Sound pack names
    const packs = [
      "Bass Essentials", 
      "Synthwave Collection", 
      "Lofi Beats", 
      "Acoustic Sessions", 
      "Trap Essentials", 
      "Cinematic Textures",
      "Jazz Fundamentals",
      "EDM Vocals",
      "Hip Hop Elements",
      "R&B Essentials",
      "Future Bass Kit",
      "Analog Drums",
      "Digital Textures",
      "Indie Acoustics",
      "Minimal Techno"
    ];
    
    // Generate 50 sounds with varied data
    return Array.from({ length: 50 }, (_, i) => {
      // Randomize release date in the last 2 years
      const daysAgo = Math.floor(Math.random() * 730);
      const releaseDate = new Date();
      releaseDate.setDate(releaseDate.getDate() - daysAgo);
      
      // Generate sound name
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const nameSuffix = Math.random() > 0.7 ? ` ${Math.floor(Math.random() * 9) + 1}` : "";
      const name = `${prefix} ${type}${nameSuffix}`;
      
      // Assign to sound pack
      const soundPack = packs[Math.floor(Math.random() * packs.length)];
      
      // Generate metrics - more popular sounds have higher metrics across all dimensions
      const popularity = Math.random() * 0.8 + 0.2; // 0.2 to 1.0 popularity factor
      
      // Each metric has its own base scale, modified by the popularity factor
      const baseStreams = Math.floor((Math.random() * 80000 + 5000) * popularity);
      const baseLikes = Math.floor((Math.random() * 5000 + 200) * popularity);
      const basePurchases = Math.floor((Math.random() * 800 + 50) * popularity);
      
      // Add some randomness to each metric
      const streams = Math.max(10, Math.floor(baseStreams * (0.8 + Math.random() * 0.4)));
      const likes = Math.max(5, Math.floor(baseLikes * (0.7 + Math.random() * 0.6)));
      const purchases = Math.max(1, Math.floor(basePurchases * (0.6 + Math.random() * 0.8)));
      
      return {
        id: (i + 1).toString(),
        name,
        soundPack,
        releaseDate,
        streams,
        likes,
        purchases,
      };
    });
  }, []);

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
