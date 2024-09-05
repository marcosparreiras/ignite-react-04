import { api } from "@/lib/axios";

export type ApproveOrderInput = {
  orderId: string;
};

export async function approveOrder(input: ApproveOrderInput): Promise<void> {
  await api.patch(`/orders/${input.orderId}/approve`);
}
