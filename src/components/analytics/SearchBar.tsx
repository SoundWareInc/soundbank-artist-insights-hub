
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search..." }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 py-2 w-full bg-[#2A2A2A] border-[#444] text-white focus:ring-[#9b87f5] focus:border-[#9b87f5]"
      />
    </div>
  );
};
