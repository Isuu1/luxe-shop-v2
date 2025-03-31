// sanity/schemas/post.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "category" }], // This tells Sanity to look for 'category' documents
        },
      ],
      options: {
        layout: "tags", // Optional: Display categories as tags for easier selection
      },
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
    }),
    defineField({
      name: "details",
      title: "Details",
      type: "blockContent",
    }),
    defineField({
      name: "specification",
      title: "Specification",
      type: "blockContent",
    }),
    defineField({
      name: "stars",
      title: "Stars",
      type: "number",
    }),
    defineField({
      name: "ratings",
      title: "Ratings",
      type: "number",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
  ],
  preview: {
    select: {
      title: "name",
      product: "product.name",
    },
    prepare(selection) {
      const { product } = selection;
      return { ...selection, subtitle: product };
    },
  },
});
