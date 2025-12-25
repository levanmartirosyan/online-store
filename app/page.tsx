"use client";
import { title } from "@/components/primitives";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { useService } from "@/services/api/UseService";
import product from "@/services/endpoints/product";
import { HttpMethod } from "@/enums/HttpMethod";
import { ProductInfo } from "@/types/product";
import { useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import "swiper/css/pagination";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";

export default function Home() {
  const [products, setProducts] = useState<ProductInfo[] | null>(null);

  const test = async () => {
    const response = await useService(
      product.ProductAll + "?page_size=10",
      HttpMethod.GET
    );
    console.log(response?.data);
    setProducts(response?.data?.products);
  };

  const fakeArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <button onClick={test}>Test</button>
      <h3 className={title()}>Our Products</h3>
      <Swiper
        slidesPerView={3}
        spaceBetween={6}
        // pagination={{
        //   clickable: true,
        // }}
        // modules={[Pagination]}
        className="flex align-center h-130 mt-6"
      >
        {products
          ? products.map((product: ProductInfo) => (
              <SwiperSlide key={product._id} className=" h-full">
                <ProductCard product={product} />
              </SwiperSlide>
            ))
          : fakeArr.map((item) => (
              <SwiperSlide key={item} className=" h-full">
                <ProductCardSkeleton />
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
}
