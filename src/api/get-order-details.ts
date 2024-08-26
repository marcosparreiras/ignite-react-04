import { api } from "@/lib/axios";
import type { Order } from "./get-orders";

type Input = {
  orderId: string;
};

type Output = {
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

export async function getOrderDetails(input: Input): Promise<Output> {
  const result = await api.get<Output>(`/orders/${input.orderId}`);
  return result.data;
}
