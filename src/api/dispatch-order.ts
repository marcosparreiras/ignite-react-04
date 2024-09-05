import { api } from "@/lib/axios";

export type DispatchOrderInput = {
  orderId: string;
};

export async function dispatchOrder(input: DispatchOrderInput): Promise<void> {
  await api.patch(`/orders/${input.orderId}/dispatch`);
}
