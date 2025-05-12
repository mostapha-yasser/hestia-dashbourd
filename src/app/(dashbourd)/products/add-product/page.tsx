"use client";

import ProductForm from "@/components/products/ProductForm";
import { handleNewProduct } from "@/service/handelProductForm";
import { useActionState } from "react";

function AddProducts() {
  const [state, handleNewProductAction] = useActionState(
    handleNewProduct,
    undefined
  );
  
  return (
    <div className="w-full max-h-screen  flex justify-center items-center py-10 ">

   <ProductForm headerContent={"Add"} handleNewProductAction={handleNewProductAction} state={state} productBeforeEdit={undefined} toggleModifyModel={()=>{}}/>
    </div>
  );
}

export default AddProducts;
