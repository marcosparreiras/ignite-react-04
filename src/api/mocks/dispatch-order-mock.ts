import { http, HttpResponse } from "msw";
import type { DispatchOrderInput } from "../dispatch-order";

export const dispatchOrderMock = http.patch<DispatchOrderInput, never, never>(
  `/orders/:orderId/dispatch`,
  ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  }
);
