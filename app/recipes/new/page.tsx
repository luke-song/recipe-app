"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "@/components/ImageUpload"
import { ThemeToggle } from "@/components/ThemeToggle"
import { supabase } from "@/lib/supabase"
import { ArrowLeft } from "lucide-react"

export default function NewRecipePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    prep_time: "",
    cook_time: "",
    servings: "",
    price: "",
    image_url: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const ingredients = formData.ingredients
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)

      const instructions = formData.instructions
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)

      const { data, error } = await supabase.from("recipes").insert({
        title: formData.title,
        description: formData.description,
        ingredients,
        instructions,
        prep_time: formData.prep_time ? parseInt(formData.prep_time) : null,
        cook_time: formData.cook_time ? parseInt(formData.cook_time) : null,
        servings: formData.servings ? parseInt(formData.servings) : null,
        price: formData.price ? parseFloat(formData.price) : null,
        image_url: formData.image_url || null,
      })

      if (error) {
        console.error("Supabase error:", error)
        console.error("Error message:", error.message)
        console.error("Error details:", error.details)
        console.error("Error hint:", error.hint)
        throw new Error(error.message || "Failed to create recipe")
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error creating recipe:", error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to create recipe. Please check your database setup and try again."
      alert(`Error: ${errorMessage}`)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#edf2f4] to-[#d1d9dd] dark:from-[#2b2d42] dark:to-[#1f2133]">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Recipes
            </Button>
          </Link>
          <ThemeToggle />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Add New Recipe</CardTitle>
            <CardDescription>
              Fill in the details to create a new recipe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Chocolate Chip Cookies"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="A brief description of the recipe"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prep_time">Prep Time (minutes)</Label>
                  <Input
                    id="prep_time"
                    name="prep_time"
                    type="number"
                    value={formData.prep_time}
                    onChange={handleChange}
                    placeholder="15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cook_time">Cook Time (minutes)</Label>
                  <Input
                    id="cook_time"
                    name="cook_time"
                    type="number"
                    value={formData.cook_time}
                    onChange={handleChange}
                    placeholder="30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    name="servings"
                    type="number"
                    value={formData.servings}
                    onChange={handleChange}
                    placeholder="4"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price to Make ($)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="12.50"
                />
                <p className="text-sm text-gray-500">
                  Total cost to make this recipe
                </p>
              </div>

              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                label="Recipe Image"
              />

              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredients *</Label>
                <Textarea
                  id="ingredients"
                  name="ingredients"
                  value={formData.ingredients}
                  onChange={handleChange}
                  required
                  placeholder="Enter each ingredient on a new line&#10;e.g.,&#10;2 cups flour&#10;1 cup sugar&#10;3 eggs"
                  rows={8}
                />
                <p className="text-sm text-gray-500">
                  Enter each ingredient on a new line
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions *</Label>
                <Textarea
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  required
                  placeholder="Enter each step on a new line&#10;e.g.,&#10;Preheat oven to 350°F&#10;Mix dry ingredients&#10;Bake for 20 minutes"
                  rows={10}
                />
                <p className="text-sm text-gray-500">
                  Enter each step on a new line
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Creating..." : "Create Recipe"}
                </Button>
                <Link href="/">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

