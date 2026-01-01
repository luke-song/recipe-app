"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { Recipe } from "@/types/recipe"

type FilterType = "recent" | "most" | null

interface RecipeSearchAndFilterProps {
  recipes: Recipe[]
  onFilteredRecipesChange: (filtered: Recipe[]) => void
}

export function RecipeSearchAndFilter({ recipes, onFilteredRecipesChange }: RecipeSearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState<FilterType>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    applyFilters(query, filter)
  }

  const handleFilter = (newFilter: FilterType) => {
    const nextFilter = filter === newFilter ? null : newFilter
    setFilter(nextFilter)
    applyFilters(searchQuery, nextFilter)
  }

  const applyFilters = (query: string, currentFilter: FilterType) => {
    let filtered = [...recipes]

    // Apply search filter
    if (query.trim()) {
      const lowerQuery = query.toLowerCase()
      filtered = filtered.filter((recipe) => {
        const titleMatch = recipe.title.toLowerCase().includes(lowerQuery)
        const descriptionMatch = recipe.description?.toLowerCase().includes(lowerQuery)
        const ingredientsMatch = recipe.ingredients?.some((ing) =>
          ing.toLowerCase().includes(lowerQuery)
        )
        return titleMatch || descriptionMatch || ingredientsMatch
      })
    }

    // Apply sort filter
    if (currentFilter === "recent") {
      filtered.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      })
    } else if (currentFilter === "most") {
      // Sort by most ingredients (you can change this to most expensive, etc.)
      filtered.sort((a, b) => {
        const aIngredients = a.ingredients?.length || 0
        const bIngredients = b.ingredients?.length || 0
        if (bIngredients !== aIngredients) {
          return bIngredients - aIngredients
        }
        // If same number of ingredients, sort by price (highest first)
        const aPrice = a.price || 0
        const bPrice = b.price || 0
        return bPrice - aPrice
      })
    }

    onFilteredRecipesChange(filtered)
  }

  const clearSearch = () => {
    setSearchQuery("")
    applyFilters("", filter)
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search recipes by name, description, or ingredients..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant={filter === "recent" ? "default" : "outline"}
          onClick={() => handleFilter("recent")}
          className={filter === "recent" ? "bg-[#ef233c] hover:bg-[#ef233c]/90" : ""}
        >
          Recent
        </Button>
        <Button
          variant={filter === "most" ? "default" : "outline"}
          onClick={() => handleFilter("most")}
          className={filter === "most" ? "bg-[#ef233c] hover:bg-[#ef233c]/90" : ""}
        >
          Most
        </Button>
        {filter && (
          <Button
            variant="ghost"
            onClick={() => handleFilter(null)}
            className="text-gray-600 dark:text-gray-400"
          >
            Clear Filter
          </Button>
        )}
      </div>
    </div>
  )
}

