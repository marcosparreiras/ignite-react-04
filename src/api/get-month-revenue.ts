import { api } from "@/lib/axios";

type Output = {
  receipt: number;
  diffFromLastMonth: number;
};

export async function getMonthRevenue(): Promise<Output> {
  const response = await api.get<Output>("/metrics/month-receipt");
  return response.data;
}
