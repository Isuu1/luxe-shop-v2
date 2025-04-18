import ProductDescription from "@/features/products/components/ProductPage/ProductDescription";
import ProductImages from "@/features/products/components/ProductPage/ProductImages";
import ProductSpecifications from "@/features/products/components/ProductPage/ProductSpecifications";
import RelatedProducts from "@/features/products/components/RelatedProducts";
import { getProduct } from "@/features/products/lib/getProduct";
import BackLink from "@/shared/components/BackLink";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await getProduct(slug);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="page">
      <BackLink />
      <div className="flex-row">
        <ProductImages product={product} />
        <ProductDescription product={product} />
      </div>
      <ProductSpecifications product={product} />
      <RelatedProducts product={product} />
    </div>
  );
}
