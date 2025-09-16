import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './useAuth'

export interface Meal {
  id: string
  user_id: string
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack'
  meal_date: string
  notes?: string
  created_at: string
  updated_at: string
  meal_items?: MealItem[]
}

export interface MealItem {
  id: string
  meal_id: string
  food_id: string
  servings: number
  foods?: {
    name: string
    calories_per_serving: number
    protein_g: number
    carbs_g: number
    fat_g: number
    brand?: string
    serving_size: string
  }
}

export function useMeals(date?: string) {
  const { user } = useAuth()
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setMeals([])
      setLoading(false)
      return
    }

    fetchMeals()
  }, [user, date])

  const fetchMeals = async () => {
    if (!user) return

    setLoading(true)
    try {
      const targetDate = date || new Date().toISOString().split('T')[0]
      
      const { data, error } = await supabase
        .from('meals')
        .select(`
          *,
          meal_items (
            *,
            foods (
              name,
              calories_per_serving,
              protein_g,
              carbs_g,
              fat_g,
              brand,
              serving_size
            )
          )
        `)
        .eq('user_id', user.id)
        .eq('meal_date', targetDate)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMeals(data || [])
    } catch (error) {
      console.error('Error fetching meals:', error)
    } finally {
      setLoading(false)
    }
  }

  const addMeal = async (mealType: Meal['meal_type'], notes?: string) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('meals')
        .insert([{
          user_id: user.id,
          meal_type: mealType,
          meal_date: date || new Date().toISOString().split('T')[0],
          notes
        }])
        .select()
        .single()

      if (error) throw error
      await fetchMeals()
      return data
    } catch (error) {
      console.error('Error adding meal:', error)
      throw error
    }
  }

  return {
    meals,
    loading,
    fetchMeals,
    addMeal
  }
}