import { api } from "@/lib/axios";

export type GetDayOrdersAmountOutput = {
  amount: number;
  diffFromYesterday: number;
};

export async function getDayOrdersAmount(): Promise<GetDayOrdersAmountOutput> {
  const response = await api.get<GetDayOrdersAmountOutput>(
    "/metrics/day-orders-amount"
  );
  return response.data;
}
