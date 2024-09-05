import { api } from "@/lib/axios";
import type { Order } from "./get-orders";

export type GetOrderDetailsInput = {
  orderId: string;
};

export type GetOrderDetailsOutput = {
  id: string;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
} & Pick<Order, "createdAt" | "status">;

export async function getOrderDetails(
  input: GetOrderDetailsInput
): Promise<GetOrderDetailsOutput> {
  const result = await api.get<GetOrderDetailsOutput>(
    `/orders/${input.orderId}`
  );
  return result.data;
}
