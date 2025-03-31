import { client } from "@/sanity/lib/client";
import { Product } from "../types/product";

export async function getProducts(): Promise<Product[]> {
  const query = `
      *[_type == "product"] {
  _id,
  name,
  slug {
    current
  },
  categories[]-> {
    _id,
    title,
    slug {
      current
    }
    // Add other category fields you need
  },
  price,
  details,
  specification,
  stars,
  ratings,
  images[]{
    asset->{
      _id,
      url
    },
    ...
  },
  publishedAt
}
    `;
  try {
    const products = await client.fetch<Product[]>(query);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
