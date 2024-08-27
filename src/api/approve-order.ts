import { api } from "@/lib/axios";

type Input = {
  orderId: string;
};

export async function approveOrder(input: Input): Promise<void> {
  await api.patch(`/orders/${input.orderId}/approve`);
}
