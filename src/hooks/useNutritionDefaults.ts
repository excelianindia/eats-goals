import { useMemo } from 'react'
import { calculateNutritionDefaults, DEFAULT_NUTRITION_GOALS, getNutritionPlaceholders } from '@/lib/nutrition-defaults'
import { NutritionGoals } from './useNutritionGoals'

/**
 * Hook for accessing nutrition defaults and placeholders based on current goals
 */
export function useNutritionDefaults(goals?: NutritionGoals | null) {
  const defaults = useMemo(() => {
    if (goals) {
      return {
        daily_calories: goals.daily_calories,
        daily_protein_g: goals.daily_protein_g,
        daily_carbs_g: goals.daily_carbs_g,
        daily_fat_g: goals.daily_fat_g,
        daily_fiber_g: goals.daily_fiber_g,
        daily_sugar_g: goals.daily_sugar_g,
        daily_sodium_mg: goals.daily_sodium_mg
      }
    }
    return DEFAULT_NUTRITION_GOALS
  }, [goals])

  const placeholders = useMemo(() => {
    return getNutritionPlaceholders(goals || undefined)
  }, [goals])

  const getCalorieDefaults = useMemo(() => {
    return (targetCalories: number = defaults.daily_calories) => 
      calculateNutritionDefaults(targetCalories)
  }, [defaults.daily_calories])

  return {
    defaults,
    placeholders,
    getCalorieDefaults
  }
}