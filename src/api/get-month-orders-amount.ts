import { api } from "@/lib/axios";

type Output = {
  amount: number;
  diffFromLastMonth: number;
};

export async function getMonthOrdersAmount(): Promise<Output> {
  const response = await api.get<Output>("/metrics/month-orders-amount");
  return response.data;
}
