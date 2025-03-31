// types/post.ts
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Category } from "./category";

export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  categories?: Category[];
  price?: number;
  details?: [];
  specification?: [];
  stars?: number;
  ratings?: number;
  images?: SanityImageSource[];
  publishedAt?: string;
}
