import colors from "tailwindcss/colors";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, ResponsiveContainer, PieChart, Pie } from "recharts";
import { BarChart } from "lucide-react";

const data = [
  { product: "Pizza", amount: 10 },
  { product: "Macarrão", amount: 12 },
  { product: "Refrigerante", amount: 14 },
  { product: "Lasanha", amount: 9 },
  { product: "Prato Feito", amount: 11 },
];

const COLORS = [
  colors.sky["500"],
  colors.amber["500"],
  colors.violet["500"],
  colors.emerald["500"],
  colors.rose["500"],
];

export function PopularProductsChart() {
  return (
    <Card className="col-span-3">
      <CardHeader className="pb-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Produtos populares
          </CardTitle>
          <BarChart className="w-4 h-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart style={{ fontSize: 12 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              dataKey="amount"
              nameKey="product"
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = 12 + innerRadius + (outerRadius - innerRadius);
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {data[index].product.length > 12
                      ? data[index].product.substring(0, 12).concat("...")
                      : data[index].product}{" "}
                    ({value})
                  </text>
                );
              }}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                  className="stroke-background hover:opacity-70"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
