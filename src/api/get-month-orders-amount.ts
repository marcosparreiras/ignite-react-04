import { api } from "@/lib/axios";

export type GetMonthOrdersAmountOutput = {
  amount: number;
  diffFromLastMonth: number;
};

export async function getMonthOrdersAmount(): Promise<GetMonthOrdersAmountOutput> {
  const response = await api.get<GetMonthOrdersAmountOutput>(
    "/metrics/month-orders-amount"
  );
  return response.data;
}
