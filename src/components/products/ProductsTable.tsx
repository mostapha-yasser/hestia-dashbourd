"use client"
import { Product } from "@/types/product";
import { Pencil, Trash } from "lucide-react";
import Deletemodel from "../models/DeleteModel";
import { useState } from "react";
import EditModel from "../models/EditModel";

function ProductsTable({ products }: { products: Product[] }) {
  const [selectedProductId, SetSelectedProductId] = useState("");
  const [selectedProduct, SetSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  const [isDeleteModelOpen, SetIsDeleteModelOpen] = useState(false);
  const [isModifyModelOpen, SetIsModifyModelOpen] = useState(false);
  const toggleDeleteModel = (id: string) => {
    SetSelectedProductId(id);
    SetIsDeleteModelOpen((prev) => !prev);
  };
  const toggleModifyModel = (selectProduct: Product | undefined) => {
    SetSelectedProduct(selectProduct);
    SetIsModifyModelOpen((prev) => !prev);
  };
  return (
    <div
      className="
    my-5 w-full  
    p-3 bg-white 
    rounded-md mb-5 
    border border-solid
     border-main"
    >
      <div
        className=" grid grid-cols-5 text-center md:text-start 
       bg-Chart-Background text-Text text-sm  md:text-xl f
       ont-bold "
      >
        <div className="p-2 truncate"> Title</div>
        <div className="p-2 truncate">category</div>
        <div className="p-2 truncate">Price</div>
        <div className="p-2 truncate">Edit</div>
        <div className="p-2 truncate">Delete</div>
      </div>
      <div className="min-h-[420px] max-h-[420px] overflow-auto scrollbar-hide py-2">
        {products?.map((product) => {
          return (
            <div
              key={product._id}
              className="
              grid grid-cols-5 text-xs text-center
              md:text-start md:text-lg truncate  border border-solid
              border-black border-opacity-10 rounded hover:bg-gray-50 my-2 text-nowrap"
            >
              <div className="p-1 truncate ">{product.name}</div>
              <div className="p-1">{product.category}</div>

              <div className="p-1 truncate ">
                {product.prices[0].price}
              </div>
              <div
                onClick={() => toggleModifyModel(product)}
                className="
               flex justify-center
               cursor-pointer
               items-center md:justify-start
               pl-4
                hover:scale-105  "
              >
                <Pencil size={25} />
              </div>
              <div
                onClick={() => toggleDeleteModel(product._id)}
                className=" 
                cursor-pointer
                md:justify-start
                items-center
                pl-4 flex justify-center
                text-red-500 
                hover:scale-105
                "
              >
                <Trash size={25} />
              </div>
            </div>
          );
        })}
      </div>
      <Deletemodel
        isModelOpen={isDeleteModelOpen}
        closeDeleteModel={toggleDeleteModel}
        id={selectedProductId}
      />
      <EditModel
        toggleModifyModel={toggleModifyModel}
        isModifyModelOpen={isModifyModelOpen}
        productBeforeEdit={selectedProduct}
      />
    </div>
  );
}

export default ProductsTable;
