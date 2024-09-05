import { http, HttpResponse } from "msw";
import type { GetDailyRevenueInPeriodOutput } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodOutput
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    { date: "01/01/2024", receipt: 120000 },
    { date: "02/01/2024", receipt: 130000 },
    { date: "03/01/2024", receipt: 100000 },
    { date: "04/01/2024", receipt: 120000 },
    { date: "05/01/2024", receipt: 120000 },
    { date: "06/01/2024", receipt: 150000 },
    { date: "07/01/2024", receipt: 120000 },
    { date: "08/01/2024", receipt: 130000 },
    { date: "09/01/2024", receipt: 170000 },
    { date: "10/01/2024", receipt: 100000 },
  ]);
});
