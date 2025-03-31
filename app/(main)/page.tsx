import Banner from "@/features/banner/Banner";
import ProductsGrid from "@/features/products/components/ProductsGrid";
import { getProducts } from "@/features/products/lib/getProducts";

export default async function Page() {
  const products = await getProducts();
  console.log(products);
  return (
    <div className="page">
      <Banner />
      <ProductsGrid />
    </div>
  );
}
