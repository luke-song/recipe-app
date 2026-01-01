"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { RecipeCardActions } from "@/components/RecipeCardActions"
import { RecipeSearchAndFilter } from "@/components/RecipeSearchAndFilter"
import { Recipe } from "@/types/recipe"

interface RecipeListProps {
  initialRecipes: Recipe[]
}

export function RecipeList({ initialRecipes }: RecipeListProps) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(initialRecipes)

  useEffect(() => {
    setFilteredRecipes(initialRecipes)
  }, [initialRecipes])

  if (initialRecipes.length === 0) {
    return null
  }

  return (
    <>
      <RecipeSearchAndFilter recipes={initialRecipes} onFilteredRecipesChange={setFilteredRecipes} />

      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No recipes found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="relative group">
              <div className="bg-white dark:bg-[#1f2133] rounded-none md:rounded-sm shadow-sm border-0 md:border border-gray-200 dark:border-gray-700/50 p-6 h-full flex flex-col">
                <div 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <RecipeCardActions recipeId={recipe.id} recipeTitle={recipe.title} />
                </div>
                
                <Link href={`/recipes/${recipe.id}`} className="block cursor-pointer flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight leading-tight flex-1">
                      {recipe.title}
                    </h3>
                    {recipe.price && (
                      <span className="text-base font-semibold text-gray-900 dark:text-white whitespace-nowrap flex-shrink-0">
                        ${recipe.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {recipe.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mt-1 mb-2 line-clamp-2">
                      {recipe.description}
                    </p>
                  )}
                  {recipe.ingredients && recipe.ingredients.length > 0 && (
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-auto leading-relaxed line-clamp-2">
                      {recipe.ingredients.slice(0, 4).join(", ")}
                      {recipe.ingredients.length > 4 && `, +${recipe.ingredients.length - 4} more`}
                    </p>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

