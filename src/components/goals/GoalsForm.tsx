import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useNutritionGoals, NutritionGoals } from '@/hooks/useNutritionGoals'
import { useNutritionDefaults } from '@/hooks/useNutritionDefaults'
import { Calculator, Target, Save } from 'lucide-react'

interface GoalsFormProps {
  onSuccess?: () => void
}

export function GoalsForm({ onSuccess }: GoalsFormProps) {
  const { goals, updateGoals, loading } = useNutritionGoals()
  const { defaults, getCalorieDefaults } = useNutritionDefaults(goals)
  const { toast } = useToast()
  const [formLoading, setFormLoading] = useState(false)
  const [formData, setFormData] = useState(defaults)

  useEffect(() => {
    if (goals) {
      setFormData({
        daily_calories: goals.daily_calories,
        daily_protein_g: goals.daily_protein_g,
        daily_carbs_g: goals.daily_carbs_g,
        daily_fat_g: goals.daily_fat_g,
        daily_fiber_g: goals.daily_fiber_g,
        daily_sugar_g: goals.daily_sugar_g,
        daily_sodium_mg: goals.daily_sodium_mg
      })
    }
  }, [goals])

  // Auto-calculate calories when macros change
  useEffect(() => {
    const calculatedCalories = Math.round(
      (formData.daily_protein_g * 4) + 
      (formData.daily_carbs_g * 4) + 
      (formData.daily_fat_g * 9)
    )
    
    if (calculatedCalories !== formData.daily_calories) {
      setFormData(prev => ({ ...prev, daily_calories: calculatedCalories }))
    }
  }, [formData.daily_protein_g, formData.daily_carbs_g, formData.daily_fat_g])

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    const numValue = parseFloat(value) || 0
    setFormData(prev => ({ ...prev, [field]: numValue }))
  }

  const calculateMacros = (targetCalories: number, proteinPercent: number = 25, carbPercent: number = 50, fatPercent: number = 25) => {
    const protein = Math.round((targetCalories * proteinPercent / 100) / 4)
    const carbs = Math.round((targetCalories * carbPercent / 100) / 4)
    const fat = Math.round((targetCalories * fatPercent / 100) / 9)
    
    // Set macros first, calories will be auto-calculated by useEffect
    setFormData(prev => ({
      ...prev,
      daily_protein_g: protein,
      daily_carbs_g: carbs,
      daily_fat_g: fat
    }))
  }

  const handleQuickSetup = (goalType: 'maintenance' | 'weight_loss' | 'muscle_gain') => {
    // Use current calculated calories as base, or fallback to defaults
    const baseCalories = formData.daily_calories || defaults.daily_calories
    
    switch (goalType) {
      case 'weight_loss':
        calculateMacros(baseCalories - 500, 30, 40, 30)
        break
      case 'muscle_gain':
        calculateMacros(baseCalories + 300, 30, 45, 25)
        break
      case 'maintenance':
      default:
        calculateMacros(baseCalories, 25, 50, 25)
        break
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      await updateGoals(formData)
      toast({
        title: "Goals updated successfully!",
        description: "Your nutrition targets have been saved.",
      })
      onSuccess?.()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setFormLoading(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading goals...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quick Setup */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Quick Setup
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={() => handleQuickSetup('weight_loss')}
              className="h-12"
            >
              Weight Loss
              <span className="text-xs text-muted-foreground ml-2">-500 cal</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickSetup('maintenance')}
              className="h-12"
            >
              Maintenance
              <span className="text-xs text-muted-foreground ml-2">balanced</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickSetup('muscle_gain')}
              className="h-12"
            >
              Muscle Gain
              <span className="text-xs text-muted-foreground ml-2">+300 cal</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Custom Goals Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Custom Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Calories - Auto-calculated */}
            <div className="space-y-2">
              <Label htmlFor="calories">Daily Calories (Auto-calculated)</Label>
              <div className="relative">
                <Input
                  id="calories"
                  type="number"
                  value={formData.daily_calories}
                  readOnly
                  className="bg-muted cursor-not-allowed"
                  placeholder="Auto-calculated from macros"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                  P×4 + C×4 + F×9
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Calories are automatically calculated from your protein, carbs, and fat targets
              </p>
            </div>

            {/* Macronutrients */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="protein">Protein (g)</Label>
                <Input
                  id="protein"
                  type="number"
                  value={formData.daily_protein_g}
                  onChange={(e) => handleInputChange('daily_protein_g', e.target.value)}
                  placeholder="120"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbs (g)</Label>
                <Input
                  id="carbs"
                  type="number"
                  value={formData.daily_carbs_g}
                  onChange={(e) => handleInputChange('daily_carbs_g', e.target.value)}
                  placeholder="250"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fat">Fat (g)</Label>
                <Input
                  id="fat"
                  type="number"
                  value={formData.daily_fat_g}
                  onChange={(e) => handleInputChange('daily_fat_g', e.target.value)}
                  placeholder="67"
                  min="0"
                  step="0.1"
                  required
                />
              </div>
            </div>

            {/* Other nutrients */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fiber">Fiber (g)</Label>
                <Input
                  id="fiber"
                  type="number"
                  value={formData.daily_fiber_g}
                  onChange={(e) => handleInputChange('daily_fiber_g', e.target.value)}
                  placeholder="25"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sugar">Sugar (g)</Label>
                <Input
                  id="sugar"
                  type="number"
                  value={formData.daily_sugar_g}
                  onChange={(e) => handleInputChange('daily_sugar_g', e.target.value)}
                  placeholder="50"
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sodium">Sodium (mg)</Label>
                <Input
                  id="sodium"
                  type="number"
                  value={formData.daily_sodium_mg}
                  onChange={(e) => handleInputChange('daily_sodium_mg', e.target.value)}
                  placeholder="2300"
                  min="0"
                  step="1"
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={formLoading}>
              <Save className="w-4 h-4 mr-2" />
              {formLoading ? "Saving..." : "Save Goals"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
