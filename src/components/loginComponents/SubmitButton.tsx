import { useEffect } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({title,toggleModifyModel,isModel}:{title:string  ,toggleModifyModel:(product:undefined)=>void|undefined,isModel:boolean}
) 
{
  const { pending } = useFormStatus();
  useEffect(()=>{


    if(isModel && !pending ){
      toggleModifyModel(undefined)
    }
  },[isModel, pending])

  return (
    <div className="flex flex-col  md:mt-3">
      <button
        disabled={pending}
        type="submit"

        className={`sm:text-xl cursor-pointer bg-main font-bold px-6 py-3 md:text-3xl 
          mx-auto w-3/4  shadow-sm rounded-lg text-white 
          ${ pending?"opacity-70":""}
          `}
      >
        {pending ? "loading.." : title}
      </button>
    </div>
  );
}

export default SubmitButton;
