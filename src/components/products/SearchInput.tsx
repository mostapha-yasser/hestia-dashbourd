function SearchInput({ handleOnChange }: { handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <input
    onChange={handleOnChange}
      className="bg-main/85 px-4 py-3 col-span-2 placeholder:text-center outline-none  text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-main"
      name="text"
      placeholder="search by name or discretion "
      type="text"
    />
  );
}

export default SearchInput;
