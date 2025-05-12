import { BadgePlus } from "lucide-react";
import Link from "next/link";

function AddButton() {
  return (
    <Link
      href={"products/add-product"}
      className="rounded-lg relative w-full z-42  overflow-hidden cursor-pointer flex items-center bg-main text-white group">
      <span className="text-gray-200 m-auto sm:ml-8
      font-semibold  transform group-hover:translate-x-[50%]  
      group-hover:text-transparent transition-all duration-300">
        Add Item
      </span>
      <span
      className="
      absolute -right-16 sm:right-0 
      
      w-10 rounded-lg 
       items-center flex
      justify-center transform group-hover:-translate-x-15 sm:group-hover:translate-x-0
     group-hover:w-full group-hover:scale-125 transition-all duration-300">
        <BadgePlus size={25}  />
      </span>
    </Link>
  );
}

export default AddButton;
