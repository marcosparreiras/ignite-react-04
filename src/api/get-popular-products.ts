import { api } from "@/lib/axios";

export type GetPopularProductsOutput = {
  product: string;
  amount: number;
}[];

export async function getPopularProducts() {
  const response = await api.get<GetPopularProductsOutput>(
    "/metrics/popular-products"
  );
  return response.data;
}
