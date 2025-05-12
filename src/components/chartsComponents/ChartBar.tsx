"use client";
import { OrderStatusCount } from "@/types/chartData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



function ChartBar({ordersByStatus}:{ordersByStatus:OrderStatusCount[]}) {
  return (
    <ResponsiveContainer width="100%" minHeight={400}  >
      <BarChart
        data={ordersByStatus}
        margin={{ top: 20, right:30 , left:5, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="statue" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="numberOfOrdersPerStatue"
          fill="var(--color-Chart-Primary)"
          />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default ChartBar;
