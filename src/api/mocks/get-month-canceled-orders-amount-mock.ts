import { http, HttpResponse } from "msw";
import type { GetMonthCanceledOrdersAmountOutput } from "../get-month-canceled-orders-amount";

export const getMonthCanceledOrdersAmountMock = http.get<
  never,
  never,
  GetMonthCanceledOrdersAmountOutput
>("/metrics/month-canceled-orders-amount", () => {
  return HttpResponse.json({
    amount: 45,
    diffFromLastMonth: 4,
  });
});
