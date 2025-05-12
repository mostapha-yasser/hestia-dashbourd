import client from "@/lib/queryClient";
import { deleteProduct } from "@/service/apiRequest/productsApiRequest";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useDeleteProduct = () => {
  const query = useMutation({
    mutationFn:(id:string)=> deleteProduct(id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["Products"],
      });
      toast.success("successful To Delete Product")
    },
  });
  return query;
};
export default useDeleteProduct;
