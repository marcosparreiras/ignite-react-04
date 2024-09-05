import { http, HttpResponse } from "msw";
import type { GetMonthRevenueOutput } from "../get-month-revenue";

export const getMonthRevenueMock = http.get<
  never,
  never,
  GetMonthRevenueOutput
>("/metrics/month-receipt", () => {
  return HttpResponse.json({
    receipt: 35400000,
    diffFromLastMonth: 12,
  });
});
