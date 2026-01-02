import { Menu, Search, Bell, Users, LogOut } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onMenuClick: () => void;
  communityName: string;
  userAvatar?: string;
  memberCount?: number;
  onLeaveCommunity?: () => void;
}

export function Header({ onMenuClick, communityName, userAvatar, memberCount = 0, onLeaveCommunity }: HeaderProps) {
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
          
          <Popover>
            <PopoverTrigger asChild>
              <button className="ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background">
                <Avatar size="sm">
                  <AvatarImage src={userAvatar} alt="Your profile" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              </button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-56 p-3">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{memberCount.toLocaleString()} members</span>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="w-full"
                  onClick={onLeaveCommunity}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Leave Community
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
