import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";

export default function SidebarHeader() {
  return (
    <div className="flex items-center justify-between mb-5 py-3 px-4  bg-[#050836] shadow-sm">
      {/* Logo + Avatar */}
      <div className="flex items-center gap-3">
        
        <h1 className="text-lg font-semibold text-[#E2E8F0] tracking-wide select-none">
          ChatApp
        </h1>
      </div>

      {/* More Button */}
      <Button
        variant="ghost"
        size="icon"
        className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors duration-200"
        aria-label="More options"
      >
        <MoreVertical className="w-5 h-5" />
      </Button>
    </div>
  );
}