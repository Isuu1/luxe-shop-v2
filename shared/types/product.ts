import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Category } from "./category";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stars: number;
  images: SanityImageSource[];
  category: Category[];
  slug: {
    current: string;
  };
};
