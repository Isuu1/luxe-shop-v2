// app/products/lib/product-queries.ts
import { client } from "@/sanity/lib/client";
import { Category } from "../types/category";

export async function getCategories(): Promise<Category[]> {
  const query = `
    *[_type == "category"] {
      _id,
      title,
      slug {
        current
      },
    }
  `;
  try {
    const categories = await client.fetch<Category[]>(query);
    return categories;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}
