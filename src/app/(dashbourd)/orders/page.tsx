"use client";
import Loading from "@/components/loadingComponents/Loading";
import FilterButtonModel from "@/components/orderComponents/FilterButtonModel";
import OrderCart from "@/components/orderComponents/OrderCart";
import { Empty } from "@/components/ui/Empty";
import useOrders from "@/Hooks/useOrders";
import { Order } from "@/types/order";
import { useState } from "react";

function Orders() {
  const [filterOrderKey, setFilterOrderKey] = useState<
    Order["orderStatus"] | "All"
  >("All");
  const { data, isLoading, isError, error } = useOrders(filterOrderKey);
  if (isError) {
    return <div>{error.message}</div>;                                                                                
  }
  const changeFilterKey = (Key: Order["orderStatus"] | "All") => {

    setFilterOrderKey(Key);
  };
          
  

  
  return (
    <div className=" w-full min-h-screen max-h-screen flex flex-col items-center gap-7 py-7 scrollbar-hide overflow-auto">
        <FilterButtonModel changeFilterKey={changeFilterKey}  filterOrderKey={filterOrderKey} />
{!data || data.length === 0 && <Empty/>}
      {isLoading ? (
        <Loading />
      ) : (

        data?.map((order: Order) => {
          return <OrderCart key={order._id} allOrderData={order} />;
        })
      )}
    </div>
  );
}

export default Orders;
