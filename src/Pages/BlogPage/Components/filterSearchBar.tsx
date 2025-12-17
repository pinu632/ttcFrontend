import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BlogFilterBarProps {
  onSearch?: (searchTerm: string) => void;
  onFilter?: () => void;
}

export default function BlogFilterBar({ onSearch, onFilter }: BlogFilterBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  return (
    <Card className="w-full p-4 md:p-6 rounded-none bg-background border-none text-card-foreground shadow-none">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-2/3 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search blogs..."
            className="pl-10"
          />
        </div>

        {/* Filter */}
        <Button
          variant="outline"
          onClick={onFilter}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-5 w-5" />
          Filter
        </Button>
      </div>
    </Card>
  );
}
