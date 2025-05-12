import { Order } from "@/types/order";
const filterKeys = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
] as const;
interface FilterButtonsInterface{
  filterOrderKey:Order["orderStatus"]|"All"
  changeFilterKey:(Key:Order["orderStatus"]|"All")=>void
}


function FilterButtons({ changeFilterKey ,filterOrderKey}:FilterButtonsInterface) {
  return (
    <>
    <div className="w-full bg-Aside flex flex-wrap md:flex-nowrap justify-evenly p-6 md:p-0   ">

      {filterKeys.map((key) => (
        <button className={`${key===filterOrderKey ?"font-bold bg-main text-white scale-x-105":""}
          px-6 py-3  text-sm cursor-pointer border-2 rounded-2xl
           m-2  
            min-w-1/2 md:min-w-0
            z-50

          md:text-base md:rounded-none
          md:m-0 md:border-0
          lg:text-2xl
          `} 
        onClick={()=>changeFilterKey(key)} key={key}>{key}</button>
      ))}
    </div>
    </>
  );
}

export default FilterButtons;
