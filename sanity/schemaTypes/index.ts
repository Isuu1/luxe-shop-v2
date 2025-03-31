import { type SchemaTypeDefinition } from "sanity";
import product from "./product";
import category from "./category";
import blockContent from "./blockContent";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, category, blockContent],
};
