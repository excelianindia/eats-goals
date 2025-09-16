import { useMemo } from 'react'
import { Meal } from './useMeals'
import { NutritionGoals } from './useNutritionGoals'

export interface DailyTotals {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  sugar: number
  sodium: number
}

export function useNutritionCalculations(meals: Meal[], goals: NutritionGoals | null) {
  const dailyTotals = useMemo<DailyTotals>(() => {
    return meals.reduce(
      (totals, meal) => {
        if (!meal.meal_items) return totals

        meal.meal_items.forEach(item => {
          if (!item.foods) return

          const servings = item.servings || 1
          totals.calories += (item.foods.calories_per_serving || 0) * servings
          totals.protein += (item.foods.protein_g || 0) * servings
          totals.carbs += (item.foods.carbs_g || 0) * servings
          totals.fat += (item.foods.fat_g || 0) * servings
          // Note: fiber, sugar, sodium are available in the foods table but not in the current query
        })

        return totals
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0, sodium: 0 }
    )
  }, [meals])

  const progressPercentages = useMemo(() => {
    if (!goals) return null

    return {
      calories: (dailyTotals.calories / goals.daily_calories) * 100,
      protein: (dailyTotals.protein / goals.daily_protein_g) * 100,
      carbs: (dailyTotals.carbs / goals.daily_carbs_g) * 100,
      fat: (dailyTotals.fat / goals.daily_fat_g) * 100,
      fiber: (dailyTotals.fiber / goals.daily_fiber_g) * 100,
      sugar: (dailyTotals.sugar / goals.daily_sugar_g) * 100,
      sodium: (dailyTotals.sodium / goals.daily_sodium_mg) * 100
    }
  }, [dailyTotals, goals])

  const mealsByType = useMemo(() => {
    return meals.reduce((acc, meal) => {
      if (!acc[meal.meal_type]) {
        acc[meal.meal_type] = []
      }
      acc[meal.meal_type].push(meal)
      return acc
    }, {} as Record<string, Meal[]>)
  }, [meals])

  const formatMealForDisplay = (meal: Meal) => {
    if (!meal.meal_items || meal.meal_items.length === 0) {
      return {
        id: meal.id,
        name: `${meal.meal_type.charAt(0).toUpperCase() + meal.meal_type.slice(1)} - No items`,
        time: new Date(meal.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      }
    }

    const totals = meal.meal_items.reduce(
      (acc, item) => {
        if (item.foods) {
          const servings = item.servings || 1
          acc.calories += (item.foods.calories_per_serving || 0) * servings
          acc.protein += (item.foods.protein_g || 0) * servings
          acc.carbs += (item.foods.carbs_g || 0) * servings
          acc.fat += (item.foods.fat_g || 0) * servings
        }
        return acc
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    )

    return {
      id: meal.id,
      name: meal.meal_items.map(item => item.foods?.name).filter(Boolean).join(', ') || 'Unknown meal',
      time: new Date(meal.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...totals
    }
  }

  return {
    dailyTotals,
    progressPercentages,
    mealsByType,
    formatMealForDisplay
  }
}