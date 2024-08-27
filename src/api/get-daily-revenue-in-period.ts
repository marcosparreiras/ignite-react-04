import { api } from "@/lib/axios";

type Input = {
  from?: Date;
  to?: Date;
};

type Output = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenueInPeriod(input: Input): Promise<Output> {
  const response = await api.get<Output>(`/metrics/daily-receipt-in-period`, {
    params: {
      from: input.from,
      to: input.to,
    },
  });
  return response.data;
}
