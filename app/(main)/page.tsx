import Banner from "@/features/banner/Banner";
import Bestsellers from "@/features/products/components/Bestsellers";
import ProductsGrid from "@/features/products/components/ProductsGrid";
import { getProducts } from "@/features/products/lib/getProducts";
import SectionHeadline from "@/shared/components/SectionHeadline";

//Icons
import { HiTrendingUp } from "react-icons/hi";
import { CiShoppingTag } from "react-icons/ci";

export default async function Page() {
  const products = await getProducts();

  return (
    <div className="page">
      <Banner />
      <SectionHeadline text="Bestsellers" icon={<HiTrendingUp />} />
      <Bestsellers products={products} />
      <SectionHeadline text="Products" icon={<CiShoppingTag />} />
      <ProductsGrid products={products} />
    </div>
  );
}
