import { Menu, Search, Bell } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";

interface HeaderProps {
  onMenuClick: () => void;
  communityName: string;
  userAvatar?: string;
}

export function Header({ onMenuClick, communityName, userAvatar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left - Menu */}
        <button
          onClick={onMenuClick}
          className="p-2.5 -ml-1 rounded-xl hover:bg-accent transition-colors"
          aria-label="Open channels menu"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>

        {/* Center - Community Name */}
        <h1 className="font-semibold text-foreground">{communityName}</h1>

        {/* Right - Actions */}
        <div className="flex items-center gap-1">
          <button className="p-2.5 rounded-xl hover:bg-accent transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="p-2.5 rounded-xl hover:bg-accent transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
          </button>
          <Avatar size="sm" className="ml-1">
            <AvatarImage src={userAvatar} alt="Your profile" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
