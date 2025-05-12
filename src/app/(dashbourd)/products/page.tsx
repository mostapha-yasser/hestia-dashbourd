"use client";

import Loading from "@/components/loadingComponents/Loading";
import ProductsTable from "@/components/products/ProductsTable";
import SearchInput from "@/components/products/SearchInput";
import AddButton from "@/components/ui/AddButton";
import useProduct from "@/Hooks/useProducts";
import { useState } from "react";

function Products() {
  const [uRLSearchParams, setURLSearchParams] = useState("");

  const { data, isPending, error, isError } = useProduct(uRLSearchParams);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const SearchParams = event.target.value;
     setURLSearchParams(SearchParams);
  };

  if (isError) {
    return (
      <p className="text-red-500 text-2xl pt-5 text-center w-full border-2 border-red-400">
        {error.message}
      </p>
    );
  }

  return (
    <div className="w-full flex flex-col py-10 px-4 items-center md:px-10 ">
      <div className="w-full grid grid-cols-3 gap-3 ">
        <SearchInput handleOnChange={handleOnChange} />
        <AddButton />
      </div>
      {isPending ? <Loading /> : <ProductsTable products={data} />}
    </div>
  );
}

export default Products;
