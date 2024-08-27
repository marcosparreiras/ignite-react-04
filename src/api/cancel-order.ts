import { api } from "@/lib/axios";

type Input = {
  orderId: string;
};

export async function cancelOrder(input: Input): Promise<void> {
  await api.patch(`/orders/${input.orderId}/cancel`);
}
