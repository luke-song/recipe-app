"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteRecipeButton } from "@/components/DeleteRecipeButton"
import { MoreVertical, Edit, Trash2 } from "lucide-react"

interface RecipeCardActionsProps {
  recipeId: string
  recipeTitle: string
}

export function RecipeCardActions({ recipeId, recipeTitle }: RecipeCardActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem asChild>
          <Link href={`/recipes/${recipeId}/edit`} className="flex items-center gap-2 cursor-pointer">
            <Edit className="h-4 w-4" />
          </Link>
        </DropdownMenuItem>
        <DeleteRecipeButton
          recipeId={recipeId}
          recipeTitle={recipeTitle}
          trigger={
            <DropdownMenuItem
              className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950 cursor-pointer"
              onSelect={(e) => e.preventDefault()}
            >
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4" />
              </div>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

