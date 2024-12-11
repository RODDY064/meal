// recipe schema

import { z } from "zod";

export const recipeSchema = z.object({
    title: z.string().min(3,{ message: "Tile must contain at least 3 character(s)"}).max(100),
    description: z.string().min(3,{ message:"Description must contain at least 3 character(s)"}).max(500),
    instructions: z.array(z.string()).min(1,{ message: "Instructions must contain at least 1 item(s)"}),
    image: z.string().url().optional(),
    category: z.string().min(3,{ message:"Category must contain at least 3 character(s)"}).max(50),
    tags: z.string().min(3,{message:"Tags must contain at least 3 character(s)"}).max(50),
});