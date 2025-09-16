import { cn } from "@/lib/utils"
import { Camera, Clock, Trash2 } from "lucide-react"
import { Button } from "./button"

interface MealCardProps {
  meal: {
    id: string
    name: string
    time: string
    calories: number
    protein: number
    carbs: number
    fat: number
    image?: string
  }
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
  className?: string
}

export function MealCard({ meal, onEdit, onDelete, className }: MealCardProps) {
  return (
    <div className={cn(
      "bg-card border rounded-xl p-4 shadow-card",
      className
    )}>
      <div className="flex gap-3">
        {/* Meal Image */}
        <div className="flex-shrink-0">
          {meal.image ? (
            <img 
              src={meal.image} 
              alt={meal.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
              <Camera className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Meal Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground truncate">{meal.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <Clock className="w-3 h-3" />
                <span>{meal.time}</span>
              </div>
            </div>
            
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(meal.id)}
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Nutrition Summary */}
          <div className="grid grid-cols-4 gap-2 mt-3">
            <div className="text-center">
              <div className="text-sm font-semibold text-foreground">{meal.calories}</div>
              <div className="text-xs text-muted-foreground">cal</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-protein">{meal.protein}g</div>
              <div className="text-xs text-muted-foreground">protein</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-carbs">{meal.carbs}g</div>
              <div className="text-xs text-muted-foreground">carbs</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-fat">{meal.fat}g</div>
              <div className="text-xs text-muted-foreground">fat</div>
            </div>
          </div>
        </div>
      </div>

      {onEdit && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(meal.id)}
          className="w-full mt-3"
        >
          Edit Meal
        </Button>
      )}
    </div>
  )
}