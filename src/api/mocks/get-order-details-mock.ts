import { http, HttpResponse } from "msw";
import {
  GetOrderDetailsInput,
  type GetOrderDetailsOutput,
} from "../get-order-details";

export const getOrderDetailsMock = http.get<
  GetOrderDetailsInput,
  never,
  GetOrderDetailsOutput
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "999999999",
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 1000,
        product: { name: "Pizza Peperoni" },
        quantity: 1,
      },
      {
        id: "order-item-2",
        priceInCents: 1200,
        product: { name: "Pizza 4 Queijos" },
        quantity: 2,
      },
    ],
    totalInCents: 3400,
  });
});
