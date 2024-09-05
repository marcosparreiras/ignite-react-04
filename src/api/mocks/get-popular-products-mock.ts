import { http, HttpResponse } from "msw";
import type { GetPopularProductsOutput } from "../get-popular-products";

export const getPopularProductsMock = http.get<
  never,
  never,
  GetPopularProductsOutput
>("/metrics/popular-products", () => {
  return HttpResponse.json([
    { amount: 210, product: "pizza" },
    { amount: 155, product: "lasanha" },
    { amount: 149, product: "risoto" },
    { amount: 194, product: "pastel" },
    { amount: 264, product: "macarrão" },
  ]);
});
