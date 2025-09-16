import { cn } from "@/lib/utils"

interface NutritionCardProps {
  label: string
  value: number
  unit: string
  max?: number
  color: "protein" | "carbs" | "fat"
  className?: string
}

export function NutritionCard({ label, value, unit, max, color, className }: NutritionCardProps) {
  const percentage = max ? (value / max) * 100 : 0

  return (
    <div className={cn(
      "p-4 rounded-xl border shadow-card bg-card",
      className
    )}>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">{label}</span>
          <span className={cn(
            "text-xs px-2 py-1 rounded-full font-medium",
            color === "protein" && "bg-protein/10 text-protein",
            color === "carbs" && "bg-carbs/10 text-carbs", 
            color === "fat" && "bg-fat/10 text-fat"
          )}>
            {value}{unit}
          </span>
        </div>
        
        {max && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{value}{unit}</span>
              <span>{max}{unit}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  color === "protein" && "bg-protein",
                  color === "carbs" && "bg-carbs",
                  color === "fat" && "bg-fat"
                )}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}