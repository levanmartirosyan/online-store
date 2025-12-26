import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <Card
      className="p-3 h-full flex flex-col justify-between w-[400px] max-h-[480px]"
      radius="lg"
    >
      <div className="space-y-3">
        <Skeleton className="rounded-lg w-1/5">
          <div className="h-4 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-5/5 rounded-lg">
          <div className="h-12 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-5 rounded-lg bg-default-200" />
        </Skeleton>
      </div>
      <Skeleton className="w-full rounded-lg">
        <div className="h-60 rounded-lg bg-default-200" />
      </Skeleton>
      <Skeleton className="w-full rounded-lg">
        <div className="h-10 rounded-lg bg-default-200" />
      </Skeleton>
    </Card>
  );
};

export default ProductCardSkeleton;
