"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/skeletons/ProductCardSkeleton";
import useProducts from "@/hooks/UseProducts";
import { ProductInfo } from "@/types/product";
import { Skeleton } from "@heroui/skeleton";

type Props = {
  pageSize?: number;
  pageNumber?: number;
  sectionTitle?: string;
  onlyDiscounted?: boolean;
  productCategory?: string;
};

const ProductSection = ({
  pageSize = 20,
  pageNumber = 1,
  sectionTitle,
  onlyDiscounted = false,
  productCategory,
}: Props) => {
  const { products, loading, fakeArr } = useProducts({
    pageSize: pageSize,
    pageNumber: pageNumber,
  });

  const filteredProducts = productCategory
    ? products.filter((p) => p?.category?.id === productCategory)
    : products;

  return (
    <div className="w-full">
      {loading || !sectionTitle ? (
        <Skeleton className="rounded-lg w-1/5 mb-4">
          <div className="h-[32px] rounded-lg bg-default-300" />
        </Skeleton>
      ) : (
        <h3 className="font-bold text-4xl mb-4">{sectionTitle}</h3>
      )}

      <Swiper
        slidesPerView="auto"
        spaceBetween={6}
        observer
        observeParents
        watchSlidesProgress
        key={loading ? "loading" : "loaded"}
        className="h-[520px] w-full"
      >
        {loading
          ? fakeArr.map((item) => (
              <SwiperSlide key={item} className="!w-[400px] h-full !mr-1.5">
                <ProductCardSkeleton />
              </SwiperSlide>
            ))
          : filteredProducts.map((product: ProductInfo) =>
              onlyDiscounted &&
              product.price.discountPercentage === 0 ? null : (
                <SwiperSlide
                  key={product._id}
                  className="!w-[400px] h-full !mr-1.5"
                >
                  <ProductCard product={product} />
                </SwiperSlide>
              )
            )}
      </Swiper>
    </div>
  );
};

export default ProductSection;
