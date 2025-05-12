"use client"
import DashboardCard from "@/components/chartsComponents/DashboardCard";
import { Users,Package,BaggageClaim  } from "lucide-react";
import ChartBar from "@/components/chartsComponents/ChartBar";
import ChartPie from "@/components/chartsComponents/ChartPie";
import ChartContainer from "@/components/chartsComponents/ChartContainer";
import useChart from "@/Hooks/useChartData";
import Loading from "@/components/loadingComponents/Loading";
import { AnalyticsSummary } from "@/types/chartData";

export default function Charts() {
  const {data,isPending}=useChart()
  
  if(isPending){
    return <Loading/>
  }
  const {totalOrders,totalUsers,totalProducts,ordersByStatus,productsByCategory}=data as AnalyticsSummary

  return (
    <div className=" w-full bg-Chart-Background flex flex-col  px-4 py-7 lg:max-h-screen space-y-6">
      <header className="w-full flex flex-col sm:flex-row sm:justify-evenly items-center">
        <DashboardCard
          label="Users"
          amount={totalUsers}
          description="Number Of Users "
          Icon={Users}
          />
        <DashboardCard
          label="Order"
          amount={totalOrders}
          description="Number Of Order "
          Icon={BaggageClaim }
        />
        <DashboardCard
          label="Products"
          amount={totalProducts}
          description="Number Of Products "
          Icon={Package}
        />
      </header>

      <ChartContainer>
        <ChartBar ordersByStatus={ordersByStatus}/>
        <ChartPie productsByCategory={productsByCategory} />
      </ChartContainer>
    </div>
  )}
