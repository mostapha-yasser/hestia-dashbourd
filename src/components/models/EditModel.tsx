import { useActionState } from "react";
import ProductForm from "../products/ProductForm";
import ModelContainer from "./ModelContainer";
import { Product } from "@/types/product";
import { handleNewProduct } from "@/service/handelProductForm";
import { SquareX } from "lucide-react";

export default function EditModel({
  isModifyModelOpen,
  productBeforeEdit,
  toggleModifyModel
}: {
  isModifyModelOpen: boolean;
  productBeforeEdit: Product | undefined;
  toggleModifyModel:(Product:undefined)=>void
}) {
  const [state, handleNewProductAction] = useActionState(
    handleNewProduct,
    undefined
  );
  return (
    <ModelContainer isModelOpen={isModifyModelOpen}>
      <div className="relative flex justify-center    w-3/5">
        <div 
        onClick={()=>toggleModifyModel(undefined)}
        className="absolute top-2 right-2 text-red-500  cursor-pointer">
          <SquareX size={30} />
        </div>

        <ProductForm
          toggleModifyModel={toggleModifyModel}
          productBeforeEdit={productBeforeEdit}
          handleNewProductAction={handleNewProductAction}
          headerContent={"Update"}
          state={state}
        />
      </div>
    </ModelContainer>
  );
}
