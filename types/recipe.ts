export interface Recipe {
  id: string
  title: string
  description: string
  ingredients: string[]
  instructions: string[]
  prep_time?: number
  cook_time?: number
  servings?: number
  price?: number
  image_url?: string
  created_at: string
  updated_at: string
}

