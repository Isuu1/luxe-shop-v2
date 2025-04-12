// app/products/lib/product-queries.ts
import { client } from "@/sanity/lib/client";
import { Category } from "../../../shared/types/category";

export async function getCategories(): Promise<Category[]> {
  const query = `
    *[_type == "category"] {
      _id,
      title,
      slug {
        current
      },
    }
    | order(title asc) // Optional: Order categories alphabetically
  `;
  try {
    const categories = await client.fetch<Category[]>(query);
    return categories;
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
}
