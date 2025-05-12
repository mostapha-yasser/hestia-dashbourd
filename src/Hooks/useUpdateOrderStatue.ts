import { Order } from "@/types/order";
import { useMutation } from "@tanstack/react-query";
import { updateOrderStatue } from "@/service/apiRequest/ordersApiRequest";
import { toast } from "react-toastify";
import client from "@/lib/queryClient";

const useUpdateOrderStatue = (
  orderData: Order,
  nextStatus: Order["orderStatus"],
) => {

  const query = useMutation({
    mutationFn: () => updateOrderStatue({
      ...orderData,
      orderStatus: nextStatus
    }),
    onSuccess: () => {
      client.invalidateQueries({predicate:query=>  query.queryKey[0] === "orders" });
      toast.success(`successful  change order statue from ${orderData.orderStatus +" to " +nextStatus}  `)
    }
  });

 
  return query;
};

export default useUpdateOrderStatue;
