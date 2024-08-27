import { getMonthCanceledOrdersAmount } from "@/api/get-month-canceled-orders-amount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { MoveDownIcon } from "lucide-react";

export function MonthCanceledOrdersAmountCard() {
  const { data } = useQuery({
    queryKey: ["metrcis", "month-canceled-orders"],
    queryFn: getMonthCanceledOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row space-y-0 items-center justify-between pb-2">
        <CardTitle className="text-base font-semibold">
          Cancelamentos (mês)
        </CardTitle>
        <MoveDownIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {data && (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {data.amount}
            </span>
            <p className="text-xs text-muted-foreground">
              {data.diffFromLastMonth >= 0 ? (
                <>
                  <span className="text-emerald-500 dark:text-emerald-400">
                    +{data.diffFromLastMonth}%
                  </span>{" "}
                  em realação ao mês passado
                </>
              ) : (
                <>
                  <span className="text-rose-500 dark:text-rose-400">
                    -{data.diffFromLastMonth}%
                  </span>{" "}
                  em realação ao mês passado
                </>
              )}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
