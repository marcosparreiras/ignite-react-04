import type { Order } from "@/api/get-orders";

type OrderStatusProps = Pick<Order, "status">;

const orderStatusMap: Record<OrderStatusProps["status"], string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em entrega",
  processing: "Em preparo",
};

export function OrderStatus(props: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {props.status === "pending" && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-slate-400"
        />
      )}
      {props.status === "canceled" && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-rose-500"
        />
      )}
      {props.status === "delivered" && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-emerald-500"
        />
      )}
      {["processing", "delivering"].includes(props.status) && (
        <span
          data-testid="badge"
          className="h-2 w-2 rounded-full bg-amber-400"
        />
      )}
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[props.status]}
      </span>
    </div>
  );
}
