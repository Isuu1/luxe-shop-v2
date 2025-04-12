import ProductDescription from "@/features/products/components/ProductPage/ProductDescription";
import ProductImages from "@/features/products/components/ProductPage/ProductImages";
import ProductSpecifications from "@/features/products/components/ProductPage/ProductSpecifications";
import { getProduct } from "@/features/products/lib/getProduct";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);
  console.log("product", product);
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="page">
      <div className="flex-row">
        <ProductImages product={product} />
        <ProductDescription product={product} />
      </div>
      <ProductSpecifications product={product} />
    </div>
  );
}
