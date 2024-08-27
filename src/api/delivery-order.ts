import { api } from "@/lib/axios";

type Input = {
  orderId: string;
};

export async function deliveryOrder(input: Input): Promise<void> {
  await api.patch(`/orders/${input.orderId}/delivery`);
}
