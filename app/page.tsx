import ProductSection from "@/components/product/ProductSection";

export default function Home() {
  return (
    <div className="w-full">
      <ProductSection sectionTitle="New Collection" />
      <ProductSection sectionTitle="Sale" onlyDiscounted={true} />
      <ProductSection sectionTitle="Laptops" productCategory="1" />
      <ProductSection sectionTitle="Phones" productCategory="2" />
    </div>
  );
}
