import { http, HttpResponse } from "msw";
import { ApproveOrderInput } from "../approve-order";

export const approveOrderMock = http.patch<ApproveOrderInput, never, never>(
  `/orders/:orderId/approve`,
  ({ params }) => {
    if (params.orderId === "error-order-id") {
      return new HttpResponse(null, { status: 400 });
    }
    return new HttpResponse(null, { status: 204 });
  }
);
