import { api } from "@/lib/axios";

type Input = {
  from?: Date;
  to?: Date;
};

export type GetDailyRevenueInPeriodOutput = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenueInPeriod(
  input: Input
): Promise<GetDailyRevenueInPeriodOutput> {
  const response = await api.get<GetDailyRevenueInPeriodOutput>(
    `/metrics/daily-receipt-in-period`,
    {
      params: {
        from: input.from,
        to: input.to,
      },
    }
  );
  return response.data;
}
