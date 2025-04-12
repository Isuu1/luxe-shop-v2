import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { Category } from "./category";
import { PortableTextBlock } from "next-sanity";

export type Product = {
  _id: string;
  name: string;
  details: PortableTextBlock[];
  specification: PortableTextBlock[];
  price: number;
  stars: number;
  ratings: number;
  images: SanityImageSource[];
  categories: Category[];
  slug: {
    current: string;
  };
};
