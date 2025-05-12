import { OrderItem } from "@/types/order";
import React from "react";

function OrderData({
  products,
  totalPrice,
}: {
  products: OrderItem[];
  totalPrice: number;
}) {
  return (
    <section className="mt-2 w-full overflow-x-hidden p1 sm:p-3
     bg-white rounded-md  border-2 border-solid border-main">
      <p className="text-Text text-base sm:text-lg my-1">Order Data</p>
      <div className="grid grid-cols-5 text-center
       bg-Chart-Background text-[12px] 
       sm:text-sm md:text-xl text-nowrap">
        <div className=" sm:p-2"> Title</div>
        <div className=" sm:p-2">Price</div>
        <div className=" sm:p-2">Size</div>
        <div className="sm:p-2">Quantity</div>
        <div className=" sm:p-2 text-start">Total Price</div>
      </div>
      <div className="min-h-36 max-h-36 overflow-y-auto
       scrollbar-hide text-[10px] sm:text-sm md:text-xl text-nowrap">
        {products.map((product) => {
          return (
            <div
              key={`${product._id+product.size}`}
              className="  grid grid-cols-5 text-center  border border-solid border-black border-opacity-10 rounded hover:bg-gray-50 my-1 text-nowrap"
            >
              <div title={product.name} className="p-1 truncate">
                {product.name}
              </div>
              <div title={product.price.toString()} className="p-1 truncate">
                {product.price}
              </div>
              <div title={product.price.toString()} className="p-1 truncate">
                {product.size} ML
              </div>

              <div title={product.quantity.toString()} className="p-1 truncate">
                {product.quantity}
              </div>
              <div
                title={(+product.quantity * +product.price).toString()}
                className="p-1 truncate"
              >
                {+product.quantity * +product.price}
              </div>
            </div>
          );
        })}
        <div className="grid grid-cols-4 text-center border border-solid border-black border-opacity-10 rounded hover:bg-gray-50 my-1 text-nowrap">
          <div className="p-1 sm:p-2 col-span-1 md:text-xl  ">Total Price</div>
          <div className="p-1 sm:p-2 col-span-3">{totalPrice}</div>
        </div>
      </div>
    </section>
  );
}

export default OrderData;
