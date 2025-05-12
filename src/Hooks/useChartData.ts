import { getChartData } from "@/service/apiRequest/charDataApiRequest";
import { AnalyticsSummary } from "@/types/chartData";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
const useChart = () : UseQueryResult<AnalyticsSummary>=> {
  const query = useQuery({
    queryKey: ["chartData"],
    queryFn: getChartData,

  });

  return query;
};

export default useChart;
