import { getProduct } from "@/features/products/lib/getProduct";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);
  console.log("product", product);

  return <div>Single product</div>;
}
