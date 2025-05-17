
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SoundsTable } from "@/components/analytics/SoundsTable";
import { SoundPacksTable } from "@/components/analytics/SoundPacksTable";
import { PurchasersTable } from "@/components/analytics/PurchasersTable";
import { SearchBar } from "@/components/analytics/SearchBar";

interface DataTablesProps {
  dateRange: {
    from: Date;
    to: Date;
    preset: string;
  };
}

export const DataTables = ({ dateRange }: DataTablesProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("sounds");

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <Tabs 
          defaultValue="sounds" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-4 bg-[#2A2A2A]">
            <TabsTrigger value="sounds">Sounds</TabsTrigger>
            <TabsTrigger value="soundpacks">Sound Packs</TabsTrigger>
            <TabsTrigger value="purchasers">Purchasers</TabsTrigger>
          </TabsList>

          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={`Search ${activeTab}...`}
          />

          <TabsContent value="sounds" className="mt-4">
            <SoundsTable searchQuery={searchQuery} dateRange={dateRange} />
          </TabsContent>
          <TabsContent value="soundpacks" className="mt-4">
            <SoundPacksTable searchQuery={searchQuery} dateRange={dateRange} />
          </TabsContent>
          <TabsContent value="purchasers" className="mt-4">
            <PurchasersTable searchQuery={searchQuery} dateRange={dateRange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
