import { client } from "@/sanity/lib/client";
import { Product } from "@/shared/types/product";

export async function getProduct(slug: string): Promise<Product | undefined> {
  const query = `
      *[_type == "product" && slug.current == $slug] {
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
    const product = await client.fetch(query, { slug });
    return product[0];
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}
