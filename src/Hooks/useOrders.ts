import { getFilteredOrders } from "@/service/apiRequest/ordersApiRequest";
import { Order } from "@/types/order";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const useOrders = (
  filterOrderKey: Order["orderStatus"] | "All"
): UseQueryResult<Order[]|[]>  => {
  const query = useQuery({
    queryKey: ["orders", filterOrderKey],
    queryFn: () => getFilteredOrders(filterOrderKey),
    staleTime:1000*5
  });

  return query;
};

export default useOrders;
