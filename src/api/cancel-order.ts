import { api } from "@/lib/axios";

export type CancelOrderInput = {
  orderId: string;
};

export async function cancelOrder(input: CancelOrderInput): Promise<void> {
  await api.patch(`/orders/${input.orderId}/cancel`);
}
