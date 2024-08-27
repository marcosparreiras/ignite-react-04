import { api } from "@/lib/axios";

type Output = {
  amount: number;
  diffFromLastMonth: number;
};

export async function getMonthCanceledOrdersAmount(): Promise<Output> {
  const response = await api.get<Output>(
    "/metrics/month-canceled-orders-amount"
  );
  return response.data;
}
