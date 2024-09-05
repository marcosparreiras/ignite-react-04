import { api } from "@/lib/axios";

export type GetMonthRevenueOutput = {
  receipt: number;
  diffFromLastMonth: number;
};

export async function getMonthRevenue(): Promise<GetMonthRevenueOutput> {
  const response = await api.get<GetMonthRevenueOutput>(
    "/metrics/month-receipt"
  );
  return response.data;
}
