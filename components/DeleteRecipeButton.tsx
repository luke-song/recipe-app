"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase"
import { Trash2 } from "lucide-react"

interface DeleteRecipeButtonProps {
  recipeId: string
  recipeTitle: string
  trigger?: React.ReactNode
}

export function DeleteRecipeButton({ recipeId, recipeTitle, trigger }: DeleteRecipeButtonProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from("recipes")
        .delete()
        .eq("id", recipeId)

      if (error) {
        console.error("Supabase error:", error)
        throw new Error(error.message || "Failed to delete recipe")
      }

      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Error deleting recipe:", error)
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to delete recipe. Please try again."
      alert(`Error: ${errorMessage}`)
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Recipe</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{recipeTitle}"? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

