import { Order } from "@/types/order";

 const Keys = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ] as const;

const  generateNextStatue= (orderData:Order)=> {
    const currentStatusIndex = Keys.indexOf(orderData.orderStatus);
      const nextStatusIndex = currentStatusIndex + 1;
      const nextStatus = Keys[nextStatusIndex > 4 ? 4 : nextStatusIndex];
    
    
  return nextStatus
}
export default  generateNextStatue