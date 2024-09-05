import { http, HttpResponse } from "msw";
import type { DeliverOrderInput } from "../delivery-order";

export const deliverOrderMock = http.patch<DeliverOrderInput, never, never>(
  `/orders/:orderId/delivery`,
  ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  }
);
