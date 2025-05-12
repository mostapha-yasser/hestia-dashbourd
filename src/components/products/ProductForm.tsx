import { ProductFormInterface, ProductInput } from "@/types/product";
import SubmitButton from "../loginComponents/SubmitButton";
import { useEffect, useState } from "react";

export default function ProductForm({
  handleNewProductAction,
  toggleModifyModel,
  state,
  productBeforeEdit,
  headerContent,
}: ProductFormInterface) {
  const [formValues, setFormValues] = useState<ProductInput>({
    _id: "",
    name: "",
    category: "jar",
    imageUrl: "",
    prices: [
      {
        price: 0,
        size: "150",
      },
      {
        price: 0,
        size: "180",
      },
      {
        price: 0,
        size: "190",
      },
    ],
    shortDesc: "",
    description: "",
  });
  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    if (
      name === "priceFor150ml" ||
      name === "priceFor180ml" ||
      name === "priceFor190ml"
    ) {
      const updatedPrices = [...formValues.prices];
      if (name === "priceFor150ml") updatedPrices[0].price = Number(value);
      if (name === "priceFor180ml") updatedPrices[1].price = Number(value);
      if (name === "priceFor190ml") updatedPrices[2].price = Number(value);

      setFormValues((prev) => ({
        ...prev,
        prices: updatedPrices,
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }
  const { _id, name, category, description, imageUrl, prices, shortDesc } =
    formValues;

  useEffect(() => {
    if (!productBeforeEdit) return;
    setFormValues({
      _id: productBeforeEdit._id,
      name: productBeforeEdit.name,
      category: productBeforeEdit.category,
      imageUrl: productBeforeEdit.imageUrl,
      shortDesc: productBeforeEdit.shortDesc,
      description: productBeforeEdit.description,
      prices: productBeforeEdit.prices,
    });
  }, [productBeforeEdit]);

  return (
    <form
      action={handleNewProductAction}
      className={`     
        ${headerContent === "Add" ? "w-11/12 md:w-4/5" : "w-full"}
        bg-white border-2 border-main
         min-h-96 max-h-screen px-2
         text-xs  md:text-sm lg:text-base
         md:px-6  rounded-2xl  grid grid-cols-1 
         mt-10 lg:mt-0`}
    >
      <p
        className="
      text-center text-2xl
      md:text-3xl
      font-bold text-main my-1 "
      >
        {headerContent} Product
      </p>
      <div className="flex  w-full justify-between ">
        <div className=" w-6/13 flex flex-col gap-0.5">
          <label htmlFor="name" className="label">
            <span className="label-text">Product Title</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            placeholder="Enter product title"
            autoComplete="off"
            onChange={handleChange}
            className="w-full  placeholder:text-center 
          
             bg-Chart-Background border-1 border-main px-6 py-2 rounded-xl"
          />
          <p className="text-center min-h-4 text-sm font-bold  text-red-500">
            {state?.errors?.name && state?.errors?.name[0]}
          </p>
        </div>
        <div className="w-6/13 flex flex-col gap-0.5">
          <label htmlFor="category" className="label">
            <span className="label-text">Product category</span>
          </label>

          <select
            value={category}
            name="category"
            id="category"
            className="w-full  placeholder:text-center 
            bg-Chart-Background border-1 border-main 
              px-6 py-2 rounded-xl"
            onChange={handleChange}
          >
            <option value="choice" disabled>
              Please choose Category
            </option>

            <option value="mold">Mold</option>
            <option value="jar">Jar</option>
          </select>

          <p className="text-center min-h-6 text-sm font-bold  text-red-500">
            {state?.errors?.category && state?.errors?.category[0]}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="imageUrl" className="label">
          <span className="label-text">Product Image URL</span>
        </label>
        <input
          onChange={handleChange}
          id="imageUrl"
          type="text"
          name="imageUrl"
          value={imageUrl}
          placeholder="Enter image URL"
          autoComplete="off"
          className="w-full  placeholder:text-center bg-Chart-Background border-1 border-main px-6 py-2 rounded-xl"
        />
        <p className="text-center min-h-6 text-sm font-bold  text-red-500">
          {state?.errors?.imageUrl && state?.errors?.imageUrl[0]}
        </p>
      </div>

      <div className="flex justify-between ">
        <div className="w-4/13 flex flex-col gap-0.5">
          <label htmlFor="price" className="label">
            <span className="label-text"> Price For &#40; 150 Ml &#41; </span>
          </label>
          <input
            onChange={handleChange}
            id="priceFor150ml"
            value={prices[0].price}
            name="priceFor150ml"
            placeholder="Enter product price"
            autoComplete="off"
            className="w-full  placeholder:text-center bg-Chart-Background border-1 border-main px-6 py-2 rounded-xl"
          />
          <p className="text-center min-h-6 text-sm font-bold  text-red-500">
            {state?.errors?.price && state?.errors?.price[0]}
          </p>
        </div>
        <div className="w-4/13 flex flex-col gap-0.5">
          <label htmlFor="price" className="label">
            <span className="label-text"> Price For &#40; 180 Ml &#41; </span>
          </label>
          <input
            onChange={handleChange}
            id="priceFor180ml"
            value={prices[1].price}
            name="priceFor180ml"
            placeholder="Enter product price"
            autoComplete="off"
            className="w-full bg-Chart-Background border-1 border-main px-6 py-2 rounded-xl"
          />
          <p className="text-center min-h-6 text-sm font-bold  text-red-500">
            {state?.errors?.price && state?.errors?.price[0]}
          </p>
        </div>
        <div className="w-4/13 flex flex-col gap-0.5">
          <label htmlFor="price" className="label">
            <span className="label-text"> Price For &#40; 190 Ml &#41; </span>
          </label>
          <input
            onChange={handleChange}
            id="priceFor190ml"
            value={prices[2].price}
            name="priceFor190ml"
            placeholder="Enter product price"
            autoComplete="off"
            className="w-full  placeholder:text-center
             bg-Chart-Background border-1 border-main px-6 py-2 rounded-xl"
          />
          <p className="text-center min-h-6 text-sm font-bold  text-red-500">
            {state?.errors?.price && state?.errors?.price[0]}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="category" className="label">
          <span className="label-text">Product Short Description</span>
        </label>
        <textarea
          onChange={handleChange}
          id="shortDesc"
          name="shortDesc"
          value={shortDesc}
          placeholder="Enter product description"
          autoComplete="off"
          className="w-full bg-Chart-Background placeholder:py-2  placeholder:text-center border-1 min-h-14 max-h-14  border-main px-6 py-2 rounded-xl"
        />
        <p className="text-center min-h-6 text-sm font-bold  text-red-500">
          {state?.errors?.description && state?.errors?.description[0]}
        </p>
      </div>

      <div className="flex flex-col gap-0.5">
        <label htmlFor="category" className="label">
          <span className="label-text">Product description</span>
        </label>
        <textarea
          onChange={handleChange}
          id="description"
          name="description"
          value={description}
          placeholder="Enter product description"
          autoComplete="off"
          className="w-full min-h-20 max-h-20
           bg-Chart-Background border-1 
           border-main px-6 py-2 rounded-xl placeholder:py-4  placeholder:text-center "
        />
        <p className="text-center min-h-6 text-sm font-bold  text-red-500">
          {state?.errors?.description && state?.errors?.description[0]}
        </p>
        <input
          onChange={handleChange}
          id="_id"
          name="_id"
          type="hidden"
          value={_id}
          autoComplete="off"
        />
      </div>

      <SubmitButton
        isModel={headerContent !== "Add"}
        toggleModifyModel={toggleModifyModel}
        title={`${headerContent} product`}
      />
      <p className=" text-center min-h-6 text-sm font-bold  text-red-500">
        {state?.error && state.error}
      </p>
    </form>
  );
}
