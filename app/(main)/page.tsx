import Banner from "@/features/banner/Banner";
import Bestsellers from "@/features/products/components/Bestsellers";
import ProductsGrid from "@/features/products/components/ProductsGrid";
import { getProducts } from "@/features/products/lib/getProducts";

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="page">
      <Banner />
      <Bestsellers products={products} />
      <ProductsGrid products={products} />
    </div>
  );
}
