import { api } from "@/lib/axios";

export type Order = {
  orderId: string;
  createdAt: string;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  customerName: string;
  total: number;
};

type Meta = {
  totalCount: number;
} & Input;

type Input = {
  pageIndex: number;
  perPage: number;
};

type Output = {
  orders: Order[];
  meta: Meta;
};

export async function getOrders(input: Input): Promise<Output> {
  const response = await api.get<Output>("/orders", {
    params: {
      pageIndex: input.pageIndex,
      // perPage: input.perPage,
    },
  });
  return response.data;
}
