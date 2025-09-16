import { useState } from "react"
import { Header } from "@/components/layout/header"
import { BottomNav } from "@/components/layout/bottom-nav"
import { NutritionCard } from "@/components/ui/nutrition-card"
import { MealCard } from "@/components/ui/meal-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, ChevronRight, Target, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data - will be replaced with Supabase data
const mockMeals = [
  {
    id: "1",
    name: "Greek Yogurt with Berries",
    time: "8:30 AM",
    calories: 180,
    protein: 15,
    carbs: 20,
    fat: 5,
  },
  {
    id: "2", 
    name: "Grilled Chicken Salad",
    time: "12:45 PM",
    calories: 420,
    protein: 35,
    carbs: 15,
    fat: 22,
  },
  {
    id: "3",
    name: "Salmon with Quinoa",
    time: "7:15 PM", 
    calories: 385,
    protein: 28,
    carbs: 35,
    fat: 18,
  }
]

const mockDailyGoals = {
  calories: 2000,
  protein: 120,
  carbs: 250,
  fat: 67
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home")

  // Calculate totals from mock meals
  const dailyTotals = mockMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )

  const calorieProgress = (dailyTotals.calories / mockDailyGoals.calories) * 100

  if (activeTab === "add") {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header title="Add Meal" />
        
        <div className="p-4 space-y-6">
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              Meal entry form will be here once Supabase is connected
            </p>
            <Button 
              onClick={() => setActiveTab("home")}
              className="mt-4"
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
        
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    )
  }

  if (activeTab === "goals") {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Header title="Goals" subtitle="Track your nutrition targets" />
        
        <div className="p-4 space-y-6">
          <div className="bg-card rounded-xl p-6 shadow-card">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h2 className="font-semibold">Daily Targets</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Calories</span>
                  <span>{mockDailyGoals.calories}</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Protein</span>
                  <span>{mockDailyGoals.protein}g</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Carbs</span>
                  <span>{mockDailyGoals.carbs}g</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Fat</span>
                  <span>{mockDailyGoals.fat}g</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </div>
          
          <div className="text-center text-muted-foreground">
            Goal customization will be available once Supabase is connected
          </div>
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
                <span className="text-2xl font-bold text-primary-foreground">U</span>
              </div>
              <h2 className="font-semibold text-lg">Welcome!</h2>
              <p className="text-muted-foreground">Connect Supabase for authentication</p>
            </div>
          </div>
          
          <div className="text-center text-muted-foreground">
            User profile and settings will be available once Supabase is connected
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
                {dailyTotals.calories} / {mockDailyGoals.calories} calories
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
            value={dailyTotals.protein}
            unit="g"
            max={mockDailyGoals.protein}
            color="protein"
          />
          <NutritionCard
            label="Carbs"
            value={dailyTotals.carbs}
            unit="g"
            max={mockDailyGoals.carbs}
            color="carbs"
          />
          <NutritionCard
            label="Fat"
            value={dailyTotals.fat}
            unit="g"
            max={mockDailyGoals.fat}
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
            {mockMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
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

        {/* Supabase Connection Notice */}
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
          <p className="text-warning-foreground text-sm">
            <strong>Connect Supabase</strong> to enable data persistence, user authentication, and full functionality.
          </p>
        </div>
      </div>
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}