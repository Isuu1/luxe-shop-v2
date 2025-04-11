import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  stars: number;
  images: SanityImageSource[];
  category: string;
  slug: {
    current: string;
  };
};
