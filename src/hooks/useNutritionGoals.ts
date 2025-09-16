import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './useAuth'
import { DEFAULT_NUTRITION_GOALS } from '@/lib/nutrition-defaults'

export interface NutritionGoals {
  id: string
  user_id: string
  daily_calories: number
  daily_protein_g: number
  daily_carbs_g: number
  daily_fat_g: number
  daily_fiber_g: number
  daily_sugar_g: number
  daily_sodium_mg: number
  created_at: string
  updated_at: string
}

export function useNutritionGoals() {
  const { user } = useAuth()
  const [goals, setGoals] = useState<NutritionGoals | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setGoals(null)
      setLoading(false)
      return
    }

    fetchGoals()
  }, [user])

  const fetchGoals = async () => {
    if (!user) return

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('nutrition_goals')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

      if (error) throw error
      
      if (!data) {
        // Create default goals if none exist
        await createDefaultGoals()
      } else {
        setGoals(data)
      }
    } catch (error) {
      console.error('Error fetching nutrition goals:', error)
    } finally {
      setLoading(false)
    }
  }

  const createDefaultGoals = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('nutrition_goals')
        .insert([{
          user_id: user.id,
          ...DEFAULT_NUTRITION_GOALS
        }])
        .select()
        .single()

      if (error) throw error
      setGoals(data)
    } catch (error) {
      console.error('Error creating default goals:', error)
    }
  }

  const updateGoals = async (updates: Partial<NutritionGoals>) => {
    if (!user || !goals) return

    try {
      const { data, error } = await supabase
        .from('nutrition_goals')
        .update(updates)
        .eq('id', goals.id)
        .select()
        .single()

      if (error) throw error
      setGoals(data)
    } catch (error) {
      console.error('Error updating goals:', error)
      throw error
    }
  }

  return {
    goals,
    loading,
    fetchGoals,
    updateGoals
  }
}