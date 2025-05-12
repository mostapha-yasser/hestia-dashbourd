import axiosInstance from "@/lib/axios/instance";
import { AnalyticsSummary } from "@/types/chartData";


const OrderUrl = "chart-data";
export const getChartData = async ():Promise<AnalyticsSummary> => {

  const { data } = await axiosInstance.get(OrderUrl);
  
  return data;
};