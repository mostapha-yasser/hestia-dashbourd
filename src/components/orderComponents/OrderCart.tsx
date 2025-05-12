import { Order } from "@/types/order";
import OrderData from "./OrderData";
import { ChevronRight, Trash2, Truck} from "lucide-react";
import useUpdateOrderStatue from "@/Hooks/useUpdateOrderStatue";
import generateNextStatue from "@/utils/generateNextStatue";
import useDeleteOrder from "@/Hooks/useDeleteOrder";
import { CustomerData } from "./CustomerData";


function OrderCart({ allOrderData }: { allOrderData: Order }) {
  const isFinalStatus = allOrderData.orderStatus === "Cancelled";
  const nextStatus = generateNextStatue(allOrderData);
  const { mutate: deleteOrder } = useDeleteOrder();

  const { isPending, mutate: updatedOrder } = useUpdateOrderStatue(
    allOrderData,
    nextStatus
  );

  const updateStatus = () => {
    updatedOrder();
  };

  return (
    <div className="w-11/12 px-4 py-2 border-3 border-main shadow-sm shadow-main rounded-xl relative flex flex-col space-y-3">
      <div className="flex w-full">
        <div className="w-10/12 md:w-11/12 orderImg ps-2 py-2 flex rounded-e-none rounded-xl">
          <p className="text-sm sm:text-base text-Text font-bold">
            Order
            <span className="text-[10px] sm:text-xs mx-2 truncate">
              #{allOrderData._id.toString()}
            </span>
          </p>
        </div>
        <p className="w-2/12 md:w-1/12 bg-main text-white rounded-s-none rounded-xl text-center text-[10px] sm:text-xs md:text-sm lg:text-base flex justify-center items-center">
          {allOrderData.orderStatus}
        </p>
      </div>
      <OrderData
        products={allOrderData.items}
        totalPrice={allOrderData.totalPrice}
      />
      <div className="flex flex-col gap-2 lg:flex-row md-gap-0 justify-between">
        <CustomerData userId={allOrderData.userId} />

       <div className="w-full lg:w-3/10 border-2 border-main/20 rounded-lg p-3 flex flex-col gap-7 justify-center items-center">
      {isFinalStatus ? (
        <button
          onClick={() => deleteOrder(allOrderData._id)}
          className="bg-red-600 hover:bg-red-700 p-2 text-white justify-center w-full rounded-lg flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Trash2 size={18} />
          Delete Order
        </button>
      ) : (
        <button
          onClick={updateStatus}
          disabled={isPending}
          className="bg-main hover:bg-main-dark p-2 text-white justify-center w-full rounded-lg flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-70"
        >
          
              <Truck size={18} />
              <span>Send To {nextStatus} Orders</span>
              <ChevronRight size={20} className="ml-auto" />
          
        </button>
      )}

      <div className="w-full flex flex-col justify-between gap-2 md:gap-5 lg:gap-7 text-xs md:text-base lg:text-xl items-center  text-Text/80">
        <div className="flex items-center gap-1">
          <span className="font-medium">Created:</span>
          {isPending ? (
            <p>loading</p>
          ) : (
            <time >
              {new Date(allOrderData.createdAt).toLocaleDateString("en", {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </time>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium">Updated:</span>
          {isPending ? (
            <p>loading</p>
          ) : (
            <time>
              {new Date(allOrderData.updatedAt).toLocaleDateString("en", {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </time>
          )}
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}

export default OrderCart;