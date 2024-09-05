import { api } from "@/lib/axios";

export type DeliverOrderInput = {
  orderId: string;
};

export async function deliveryOrder(input: DeliverOrderInput): Promise<void> {
  await api.patch(`/orders/${input.orderId}/delivery`);
}
