import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import { Recipe } from "@/types/recipe"
import { DeleteRecipeButton } from "@/components/DeleteRecipeButton"
import { ThemeToggle } from "@/components/ThemeToggle"
import { ArrowLeft, Clock, Users, DollarSign, Edit } from "lucide-react"

export const revalidate = 0 // Disable caching to always show fresh data

async function getRecipe(id: string): Promise<Recipe | null> {
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const recipe = await getRecipe(id)

  if (!recipe) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#1a1a1a]">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2 text-gray-600 dark:text-gray-400">
              <ArrowLeft className="h-4 w-4" />
              Back to Menu
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href={`/recipes/${id}/edit`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
            <DeleteRecipeButton recipeId={id} recipeTitle={recipe.title} />
          </div>
        </div>

        <div className="bg-white dark:bg-[#1f2133] rounded-none md:rounded-sm shadow-sm border-0 md:border border-gray-200 dark:border-gray-700/50 p-6 md:p-10 lg:p-12">
          {/* Header Section */}
          <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700/50">
            <div className="flex items-baseline justify-between gap-4 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                {recipe.title}
              </h1>
              {recipe.price && (
                <span className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white whitespace-nowrap flex-shrink-0">
                  ${recipe.price.toFixed(2)}
                </span>
              )}
            </div>
            {recipe.description && (
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
                {recipe.description}
              </p>
            )}
            
            {/* Meta Information */}
            <div className="flex flex-wrap gap-4 md:gap-6 mt-4 text-sm text-gray-500 dark:text-gray-500">
              {recipe.prep_time && (
                <span>Prep: {recipe.prep_time} min</span>
              )}
              {recipe.cook_time && (
                <span>Cook: {recipe.cook_time} min</span>
              )}
              {recipe.servings && (
                <span>Serves: {recipe.servings}</span>
              )}
            </div>
          </div>

          {/* Image Section */}
          {recipe.image_url && (
            <div className="mb-8">
              <div className="w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={recipe.image_url}
                  alt={recipe.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {/* Ingredients Section */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Ingredients
            </h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start gap-3 text-base text-gray-700 dark:text-gray-300">
                  <span className="text-gray-400 dark:text-gray-600 mt-1.5">•</span>
                  <span className="flex-1">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 dark:bg-gray-700/50 mb-8" />

          {/* Instructions Section */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 flex items-center justify-center text-sm font-semibold mt-0.5">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-base text-gray-700 dark:text-gray-300 leading-relaxed">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

