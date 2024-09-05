import { http, HttpResponse } from "msw";
import type { GetMonthOrdersAmountOutput } from "../get-month-orders-amount";

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountOutput
>("/metrics/month-orders-amount", () => {
  return HttpResponse.json({
    amount: 1320,
    diffFromLastMonth: -4,
  });
});
