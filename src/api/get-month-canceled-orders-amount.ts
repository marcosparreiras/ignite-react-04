import { api } from "@/lib/axios";

export type GetMonthCanceledOrdersAmountOutput = {
  amount: number;
  diffFromLastMonth: number;
};

export async function getMonthCanceledOrdersAmount(): Promise<GetMonthCanceledOrdersAmountOutput> {
  const response = await api.get<GetMonthCanceledOrdersAmountOutput>(
    "/metrics/month-canceled-orders-amount"
  );
  return response.data;
}
