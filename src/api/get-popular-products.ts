import { api } from "@/lib/axios";

type Output = {
  product: string;
  amount: number;
}[];

export async function getPopularProducts() {
  const response = await api.get<Output>("/metrics/popular-products");
  return response.data;
}
