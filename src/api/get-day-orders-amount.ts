import { api } from "@/lib/axios";

type Output = {
  amount: number;
  diffFromYesterday: number;
};

export async function getDayOrdersAmount(): Promise<Output> {
  const response = await api.get<Output>("/metrics/day-orders-amount");
  return response.data;
}
