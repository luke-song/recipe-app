import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ThemeToggle"
import { RecipeList } from "@/components/RecipeList"
import { supabase } from "@/lib/supabase"
import { Recipe } from "@/types/recipe"
import { Plus } from "lucide-react"

export const revalidate = 0 // Disable caching to always show fresh data

async function getRecipes(): Promise<Recipe[]> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching recipes:', error)
    return []
  }

  return data || []
}

export default async function Home() {
  const recipes = await getRecipes()

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1a1a1a]">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <ThemeToggle />
          <Link href="/recipes/new">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Menu Book Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white tracking-tight uppercase">
            Menu
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-light">
            {recipes.length > 0 && `${recipes.length} ${recipes.length === 1 ? 'item' : 'items'} available`}
          </p>
        </div>

        {recipes.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No recipes yet. Start adding some delicious recipes!
              </p>
              <Link href="/recipes/new">
                <Button>Add Your First Recipe</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <RecipeList initialRecipes={recipes} />
        )}
      </div>
    </div>
  )
}
