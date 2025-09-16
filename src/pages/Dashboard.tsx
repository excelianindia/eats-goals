import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { NutritionCard } from "@/components/ui/nutrition-card"
import { MealCard } from "@/components/ui/meal-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, ChevronRight, Target, TrendingUp, LogOut } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useMeals } from "@/hooks/useMeals"
import { useNutritionGoals } from "@/hooks/useNutritionGoals"
import { useNutritionCalculations } from "@/hooks/useNutritionCalculations"
import { useNutritionDefaults } from "@/hooks/useNutritionDefaults"
import { AuthForm } from "@/components/auth/AuthForm"
import { AddMealForm } from "@/components/meals/AddMealForm"
import { GoalsForm } from "@/components/goals/GoalsForm"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const today = new Date().toISOString().split('T')[0]
  const { meals, loading: mealsLoading, fetchMeals } = useMeals(today)
  const { goals, loading: goalsLoading } = useNutritionGoals()
  const { defaults } = useNutritionDefaults(goals)
  const { dailyTotals, progressPercentages, formatMealForDisplay } = useNutritionCalculations(meals, goals)

  const loading = authLoading || mealsLoading || goalsLoading
  const calorieProgress = progressPercentages?.calories || 0

  // Format meals for display
  const displayMeals = meals.map(formatMealForDisplay)

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      toast({
        title: "Signed out successfully",
        description: "You've been signed out of your account.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  if (!user && !authLoading) {
    return <AuthForm />
  }

  if (activeTab === "add") {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header title="Add Meal" />
        
        <div className="p-4 space-y-6">
          <AddMealForm onSuccess={() => {
            setActiveTab("home")
            fetchMeals()
          }} />
        </div>
        
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    )
  }

  if (activeTab === "goals") {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header title="Goals" subtitle="Set your nutrition targets" />
        
        <div className="p-4 space-y-6">
          {/* Current Progress */}
          {goals && (
            <div className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="font-semibold">Current Progress</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Calories</span>
                    <span>{Math.round(dailyTotals.calories)} / {goals.daily_calories}</span>
                  </div>
                  <Progress value={Math.min(progressPercentages?.calories || 0, 100)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Protein</span>
                    <span>{Math.round(dailyTotals.protein)} / {goals.daily_protein_g}g</span>
                  </div>
                  <Progress value={Math.min(progressPercentages?.protein || 0, 100)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Carbs</span>
                    <span>{Math.round(dailyTotals.carbs)} / {goals.daily_carbs_g}g</span>
                  </div>
                  <Progress value={Math.min(progressPercentages?.carbs || 0, 100)} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Fat</span>
                    <span>{Math.round(dailyTotals.fat)} / {goals.daily_fat_g}g</span>
                  </div>
                  <Progress value={Math.min(progressPercentages?.fat || 0, 100)} className="h-2" />
                </div>
              </div>
            </div>
          )}
          
          {/* Goals Form */}
          <GoalsForm onSuccess={() => {
            // Goals will be automatically refetched by the hook
          }} />
        </div>
        
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    )
  }

  if (activeTab === "stats") {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header title="Statistics" subtitle="Your nutrition progress" />
        
        <div className="p-4 space-y-6">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-success" />
              <h2 className="font-semibold">Weekly Progress</h2>
            </div>
            
            <div className="text-center py-8 text-muted-foreground">
              Charts and analytics will be available once Supabase is connected
            </div>
          </div>
        </div>
        
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    )
  }

  if (activeTab === "profile") {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header title="Profile" />
        
        <div className="p-4 space-y-6">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">
                  {user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="font-semibold text-lg">Welcome back!</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
        
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    )
  }

  // Home tab (default)
  return (
    <div className="min-h-screen bg-background pb-20">
      <Header 
        title="NutriTrack" 
        subtitle="Monday, September 16" 
        showNotifications 
      />
      
      <div className="p-4 space-y-6">
        {/* Daily Summary */}
        <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground shadow-glow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Today's Progress</h2>
              <p className="text-primary-foreground/80 text-sm">
                {Math.round(dailyTotals.calories)} / {goals?.daily_calories || defaults.daily_calories} calories
              </p>
            </div>
            <Calendar className="w-6 h-6" />
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Calories</span>
              <span>{Math.round(calorieProgress)}%</span>
            </div>
            <div className="w-full bg-primary-foreground/20 rounded-full h-2">
              <div 
                className="h-2 bg-primary-foreground rounded-full transition-all duration-300"
                style={{ width: `${Math.min(calorieProgress, 100)}%` }}
              />
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            size="sm" 
            className="w-full bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Nutrition Overview */}
        <div className="grid grid-cols-3 gap-3">
          <NutritionCard
            label="Protein"
            value={Math.round(dailyTotals.protein)}
            unit="g"
            max={goals?.daily_protein_g || defaults.daily_protein_g}
            color="protein"
          />
          <NutritionCard
            label="Carbs"
            value={Math.round(dailyTotals.carbs)}
            unit="g"
            max={goals?.daily_carbs_g || defaults.daily_carbs_g}
            color="carbs"
          />
          <NutritionCard
            label="Fat"
            value={Math.round(dailyTotals.fat)}
            unit="g"
            max={goals?.daily_fat_g || defaults.daily_fat_g}
            color="fat"
          />
        </div>

        {/* Recent Meals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Today's Meals</h3>
            <Button variant="ghost" size="sm">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <div className="text-center text-muted-foreground py-8">
                Loading meals...
              </div>
            ) : displayMeals.length > 0 ? (
              displayMeals.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))
            ) : (
              <div className="text-center text-muted-foreground py-8">
                No meals logged today. Add your first meal!
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => setActiveTab("add")}
              className="h-12"
            >
              Add Meal
            </Button>
            <Button 
              variant="outline"
              onClick={() => setActiveTab("goals")}
              className="h-12"
            >
              Update Goals
            </Button>
          </div>
        </div>

        {/* Status Notice */}
        {!goals && !loading && (
          <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
            <p className="text-warning-foreground text-sm">
              <strong>Setting up your nutrition goals...</strong> Your personalized targets are being created.
            </p>
          </div>
        )}
      </div>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}