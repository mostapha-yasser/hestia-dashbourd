import axiosInstance from "@/lib/axios/instance";
import { Order, OrderInput } from "@/types/order";

const OrderUrl = "orders";
const getAllOrders = async (): Promise<Order[]> => {
  const { data } = await axiosInstance.get(OrderUrl);
  return data;
};
const getFilteredOrders = async (
  filterOrderKey: Order["orderStatus"] | "All"
): Promise<Order[]> => {
  const { data } = await axiosInstance.get(
    `${OrderUrl}?orderStatus=${filterOrderKey === "All" ? "" : filterOrderKey}`
  );
  return data;
};

const createOrder = async (OrderData: OrderInput) => {
  const data = await axiosInstance.post(OrderUrl, OrderData);

  return data;
};

const deleteOrder = async (orderId:string) => {
  const data = await axiosInstance.delete(`${OrderUrl}/${orderId}`);

  return data;
};
const updateOrderStatue = async (
  updatedOrder: Order
) => {
  const data = await axiosInstance.put(`${OrderUrl}/${updatedOrder._id}`, updatedOrder);

  return data;
};
export {
  getAllOrders,
  createOrder,
  deleteOrder,
  updateOrderStatue,
  getFilteredOrders,
};
