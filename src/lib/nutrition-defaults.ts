// Centralized nutrition default values and calculations

export interface NutritionDefaults {
  daily_calories: number
  daily_protein_g: number
  daily_carbs_g: number
  daily_fat_g: number
  daily_fiber_g: number
  daily_sugar_g: number
  daily_sodium_mg: number
}

/**
 * Calculate default nutrition goals based on activity level and goal type
 * Default formula: 2000 calories with 25% protein, 50% carbs, 25% fat
 */
export function calculateNutritionDefaults(
  baseCalories: number = 2000,
  proteinPercent: number = 25,
  carbPercent: number = 50,
  fatPercent: number = 25
): NutritionDefaults {
  const protein = Math.round((baseCalories * proteinPercent / 100) / 4)
  const carbs = Math.round((baseCalories * carbPercent / 100) / 4)
  const fat = Math.round((baseCalories * fatPercent / 100) / 9)
  
  return {
    daily_calories: baseCalories,
    daily_protein_g: protein,
    daily_carbs_g: carbs,
    daily_fat_g: fat,
    daily_fiber_g: Math.round(baseCalories / 80), // ~25g for 2000 cal
    daily_sugar_g: Math.round(baseCalories / 40), // ~50g for 2000 cal
    daily_sodium_mg: 2300 // Standard recommendation
  }
}

/**
 * Standard default nutrition goals
 */
export const DEFAULT_NUTRITION_GOALS = calculateNutritionDefaults()

/**
 * Get appropriate placeholder values based on serving size
 */
export function getNutritionPlaceholders(goals?: { 
  daily_calories?: number
  daily_protein_g?: number
  daily_carbs_g?: number
  daily_fat_g?: number
}) {
  const defaults = goals ? {
    daily_calories: goals.daily_calories || DEFAULT_NUTRITION_GOALS.daily_calories,
    daily_protein_g: goals.daily_protein_g || DEFAULT_NUTRITION_GOALS.daily_protein_g,
    daily_carbs_g: goals.daily_carbs_g || DEFAULT_NUTRITION_GOALS.daily_carbs_g,
    daily_fat_g: goals.daily_fat_g || DEFAULT_NUTRITION_GOALS.daily_fat_g,
  } : DEFAULT_NUTRITION_GOALS

  // Calculate per-meal averages (assuming 3 meals + 1 snack = 4 eating occasions)
  return {
    calories: Math.round(defaults.daily_calories / 4),
    protein: Math.round(defaults.daily_protein_g / 4),
    carbs: Math.round(defaults.daily_carbs_g / 4),
    fat: Math.round(defaults.daily_fat_g / 4)
  }
}