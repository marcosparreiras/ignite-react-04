import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./oreder-details";
import { GetOrdersOutput, type Order } from "@/api/get-orders";
import { OrderStatus } from "@/components/order-status";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/cancel-order";
import { approveOrder } from "@/api/approve-order";
import { deliveryOrder } from "@/api/delivery-order";
import { dispatchOrder } from "@/api/dispatch-order";

interface OrderTableRowProps {
  order: Order;
}

export function OrderTableRow(props: OrderTableRowProps) {
  const queryClient = useQueryClient();
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  function updateOrderStatusOnCache(input: Pick<Order, "status" | "orderId">) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersOutput>({
      queryKey: ["orders"],
    });

    ordersListCache.forEach(([cachedKey, cachedOrders]) => {
      if (!cachedOrders) {
        return;
      }
      const orderIndex = cachedOrders.orders.findIndex(
        (order) => order.orderId === input.orderId
      );
      if (orderIndex !== -1) {
        cachedOrders.orders[orderIndex].status = input.status;
        queryClient.setQueryData<GetOrdersOutput>(cachedKey, cachedOrders);
      }
    });
  }

  const { mutateAsync: approveOrderFn, isPending: isApproving } = useMutation({
    mutationFn: approveOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache({ status: "processing", orderId });
    },
  });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatching } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache({ status: "delivering", orderId });
      },
    });

  const { mutateAsync: deliveryOrderFn, isPending: isDelivering } = useMutation(
    {
      mutationFn: deliveryOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache({ status: "delivered", orderId });
      },
    }
  );

  const { mutateAsync: cancelOrderFn, isPending: isCanceling } = useMutation({
    mutationFn: cancelOrder,
    async onSuccess(_, { orderId }) {
      updateOrderStatusOnCache({ status: "canceled", orderId });
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />{" "}
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={props.order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {props.order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(props.order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={props.order.status} />
      </TableCell>
      <TableCell className="font-medium">{props.order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(props.order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>
        {props.order.status === "pending" && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => approveOrderFn({ orderId: props.order.orderId })}
            disabled={isApproving}
          >
            <ArrowRight className="w-3 h-3 mr-2" />
            Aprovar
          </Button>
        )}
        {props.order.status === "processing" && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => dispatchOrderFn({ orderId: props.order.orderId })}
            disabled={isDispatching}
          >
            <ArrowRight className="w-3 h-3 mr-2" />
            Em entrega
          </Button>
        )}
        {props.order.status === "delivering" && (
          <Button
            variant="outline"
            size="xs"
            onClick={() => deliveryOrderFn({ orderId: props.order.orderId })}
            disabled={isDelivering}
          >
            <ArrowRight className="w-3 h-3 mr-2" />
            Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: props.order.orderId })}
          variant="ghost"
          size="xs"
          disabled={
            !["pending", "processing"].includes(props.order.status) ||
            isCanceling
          }
        >
          <X className="w-3 h-3 mr-2" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
