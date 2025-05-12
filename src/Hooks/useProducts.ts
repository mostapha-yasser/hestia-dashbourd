import { getFilteredOrAllProducts } from "@/service/apiRequest/productsApiRequest";
import { useQuery } from "@tanstack/react-query";
const useProduct = (uRLSearchParams: string | null) => {
  const query = useQuery({
    queryKey: ["Products", uRLSearchParams],
    queryFn: () => getFilteredOrAllProducts(uRLSearchParams),
    
  });

  return query;
};

export default useProduct;
