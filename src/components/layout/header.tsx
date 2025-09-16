import { cn } from "@/lib/utils"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  title: string
  subtitle?: string
  showSearch?: boolean
  showNotifications?: boolean
  className?: string
}

export function Header({ 
  title, 
  subtitle, 
  showSearch = false, 
  showNotifications = false,
  className 
}: HeaderProps) {
  return (
    <header className={cn(
      "sticky top-0 z-40 bg-gradient-nutrition backdrop-blur-sm border-b border-border/50",
      "px-4 py-4 safe-area-pt",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
              <Search className="w-4 h-4" />
            </Button>
          )}
          
          {showNotifications && (
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 relative">
              <Bell className="w-4 h-4" />
              <div className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}