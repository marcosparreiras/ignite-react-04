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
  pageIndex: number;
  perPage: number;
};

type Input = {
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
  pageIndex: number;
};

export type GetOrdersOutput = {
  orders: Order[];
  meta: Meta;
};

export async function getOrders(input: Input): Promise<GetOrdersOutput> {
  const response = await api.get<GetOrdersOutput>("/orders", {
    params: {
      pageIndex: input.pageIndex,
      orderId: input.orderId,
      customerName: input.customerName,
      status: input.status === "all" ? null : input.status,
    },
  });
  return response.data;
}
