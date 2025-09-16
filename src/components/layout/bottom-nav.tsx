import { cn } from "@/lib/utils"
import { Home, Plus, Target, User, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "add", icon: Plus, label: "Add", isPrimary: true },
  { id: "goals", icon: Target, label: "Goals" },
  { id: "stats", icon: BarChart3, label: "Stats" },
  { id: "profile", icon: User, label: "Profile" },
]

export function BottomNav({ activeTab, onTabChange, className }: BottomNavProps) {
  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border",
      "safe-area-pb px-4 py-2",
      className
    )}>
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          if (item.isPrimary) {
            return (
              <Button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "h-12 w-12 rounded-full bg-gradient-primary shadow-glow",
                  "hover:scale-105 transition-transform duration-200"
                )}
              >
                <Icon className="w-6 h-6" />
              </Button>
            )
          }

          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center gap-1 h-16 w-16 p-1",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}