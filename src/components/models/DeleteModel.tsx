import { useEffect } from "react";
import ModelContainer from "./ModelContainer";
import useDeleteProduct from "@/Hooks/useDeleteProduct";
interface DeleteModelInterface {
  isModelOpen: boolean;
  closeDeleteModel: (id: string) => void;
  id: string;
}
function Deletemodel({
  isModelOpen,
  closeDeleteModel,
  id,
}: DeleteModelInterface) {
  const { mutate, isPending, isSuccess } = useDeleteProduct();

  const handelConfirmDelete =  () => {
     mutate(id);
  };
  useEffect(()=>{
    if(isSuccess)
    {
    closeDeleteModel(id);

    }


  },[ isSuccess])
  return (
    <ModelContainer isModelOpen={isModelOpen}>
      <div
        className={`min-w-fit p-10 flex flex-col gap-10 bg-white rounded-2xl`}
      >
        <p className="text-xl text-center w-full ">
          Are you sure you want to Delete product ?
        </p>
        <div className="flex justify-end gap-5">
          <button
            onClick={() => closeDeleteModel(id)}
            className="border-2 cursor-pointer border-main text-text  px-6 py-3 rounded-xl   "
          >
            close
          </button>
          <button
            disabled={isPending}
            onClick={handelConfirmDelete}
            className={`bg-red-500  cursor-pointer text-white px-6 py-3 rounded-xl  ${
              isPending ? "opacity-35" : ""
            }`}
          >
            Delete
          </button>
        </div>
      </div>
    </ModelContainer>
  );
}

export default Deletemodel;
