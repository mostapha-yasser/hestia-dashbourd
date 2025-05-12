import client from "@/lib/queryClient";
import { deleteOrder } from "@/service/apiRequest/ordersApiRequest";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteOrder = () => {
  const query = useMutation({
    mutationFn:(orderId:string)=> deleteOrder(orderId),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["orders"],
      });
      toast.success("successful To Delete Order")
    },
  });
  return query;
};
export default useDeleteOrder;
