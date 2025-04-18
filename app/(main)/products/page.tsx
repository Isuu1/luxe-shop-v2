import ProductsGrid from "@/features/products/components/ProductsGrid";
import { getProducts } from "@/features/products/lib/getProducts";
import BackLink from "@/shared/components/BackLink";

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="page">
      <BackLink />
      <ProductsGrid products={products} />
    </div>
  );
}
