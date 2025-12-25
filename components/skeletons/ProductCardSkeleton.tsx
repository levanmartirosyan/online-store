import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import React from "react";

const ProductCardSkeleton = () => {
  return (
    <Card className="w-[400px] space-y-5 p-4 " radius="lg">
      <div className="space-y-3">
        <Skeleton className="rounded-lg w-1/5">
          <div className="h-4 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-5/5 rounded-lg">
          <div className="h-4 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-4 rounded-lg bg-default-200" />
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
