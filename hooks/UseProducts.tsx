import { HttpMethod } from "@/enums/HttpMethod";
import { useService } from "@/services/api/UseService";
import product from "@/services/endpoints/product";
import { ProductInfo } from "@/types/product";
import { useEffect, useState } from "react";

type Props = {
  pageSize?: number;
  pageNumber?: number;
};

const useProducts = ({ pageSize = 20, pageNumber = 1 }: Props) => {
  const [products, setProducts] = useState<ProductInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fakeArr, setFakeArr] = useState<number[]>(
    new Array(pageSize).fill(0).map((_, index) => index)
  );

  const fetchProducts = async (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);
    try {
      const response = await useService(
        product.ProductAll + `?page_size=${pageSize}&page_number=${pageNumber}`,
        HttpMethod.GET,
        { signal }
      );
      setProducts(response?.data?.products ?? []);
    } catch (err: any) {
      if (signal && signal.aborted) return;
      setError(err?.message ?? "Error fetching products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);
    return () => controller.abort();
  }, [pageSize, pageNumber]);

  return { products, loading, fakeArr, error, refetch: () => fetchProducts() };
};

export default useProducts;
