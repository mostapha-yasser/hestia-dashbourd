import { Order } from "@/types/order";
import FilterButtons from "./FilterButtons";
import { useState } from "react";
import { SquareChevronDown } from "lucide-react";

interface FilterButtonsInterface {
  filterOrderKey: Order["orderStatus"] | "All";
  changeFilterKey: (Key: Order["orderStatus"] | "All") => void;
}
function FilterButtonModel({
  changeFilterKey,
  filterOrderKey,
}: FilterButtonsInterface) {
  const [isFilterModelOpen, setIsFilterModelOpen] = useState(false);
  const toggleAside = () => {
    setIsFilterModelOpen((prev) => !prev);
  };
  return (
    <>
      <div
        onClick={toggleAside}
        className="fixed md:hidden text-white flex g-2 lg:hidden top-0 z-50 right-2"
      >
        filter order <SquareChevronDown />
      </div>

      {isFilterModelOpen && (
        <div className="w-full md:hidden fixed top-6 z-50">
          <FilterButtons
            filterOrderKey={filterOrderKey}
            changeFilterKey={changeFilterKey}
          />
        </div>
      )}
      <div className="w-full hidden md:block">
        <FilterButtons
          filterOrderKey={filterOrderKey}
          changeFilterKey={changeFilterKey}
        />
      </div>
    </>
  );
}

export default FilterButtonModel;
