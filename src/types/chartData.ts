
export type AnalyticsSummary = {
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
    productsByCategory: CategoryProductCount[];
   ordersByStatus: OrderStatusCount[];
};

export type  CategoryProductCount   = {
  name: "mold" | "jar";
  value: number;
};

export type OrderStatusCount = {
  numberOfOrdersPerStatue: number;
  statue: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
};

export interface RenderActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: CategoryProductCount;
  percent: number;
  value: number;
}
