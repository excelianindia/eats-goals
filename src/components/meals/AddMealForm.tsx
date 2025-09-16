import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { useMeals } from '@/hooks/useMeals'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'

interface AddMealFormProps {
  onSuccess?: () => void
}

export function AddMealForm({ onSuccess }: AddMealFormProps) {
  const { user } = useAuth()
  const { addMeal } = useMeals()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast')
  const [notes, setNotes] = useState('')
  const [foodName, setFoodName] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')
  const [servings, setServings] = useState('1')
  const [servingSize, setServingSize] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      // First create the meal
      const meal = await addMeal(mealType, notes)
      if (!meal) throw new Error('Failed to create meal')

      // Then create a custom food item
      const { data: food, error: foodError } = await supabase
        .from('foods')
        .insert([{
          name: foodName,
          calories_per_serving: parseInt(calories),
          protein_g: parseFloat(protein) || 0,
          carbs_g: parseFloat(carbs) || 0,
          fat_g: parseFloat(fat) || 0,
          serving_size: servingSize || '1 serving',
          created_by: user.id
        }])
        .select()
        .single()

      if (foodError) throw foodError

      // Add the food to the meal
      const { error: mealItemError } = await supabase
        .from('meal_items')
        .insert([{
          meal_id: meal.id,
          food_id: food.id,
          servings: parseFloat(servings)
        }])

      if (mealItemError) throw mealItemError

      toast({
        title: "Meal added successfully!",
        description: `${foodName} has been added to your ${mealType}.`,
      })

      // Reset form
      setFoodName('')
      setCalories('')
      setProtein('')
      setCarbs('')
      setFat('')
      setServings('1')
      setServingSize('')
      setNotes('')
      
      onSuccess?.()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Meal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mealType">Meal Type</Label>
            <Select value={mealType} onValueChange={(value: any) => setMealType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Breakfast</SelectItem>
                <SelectItem value="lunch">Lunch</SelectItem>
                <SelectItem value="dinner">Dinner</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="foodName">Food Name</Label>
            <Input
              id="foodName"
              type="text"
              placeholder="e.g., Grilled Chicken Breast"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="250"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                type="number"
                step="0.1"
                placeholder="1"
                value={servings}
                onChange={(e) => setServings(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                type="number"
                step="0.1"
                placeholder="25"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input
                id="carbs"
                type="number"
                step="0.1"
                placeholder="0"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">Fat (g)</Label>
              <Input
                id="fat"
                type="number"
                step="0.1"
                placeholder="5"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="servingSize">Serving Size</Label>
            <Input
              id="servingSize"
              type="text"
              placeholder="e.g., 100g, 1 cup"
              value={servingSize}
              onChange={(e) => setServingSize(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional notes about this meal..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding meal..." : "Add Meal"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}