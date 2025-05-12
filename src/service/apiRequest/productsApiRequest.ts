import axiosInstance from "@/lib/axios/instance";
import { Product, ProductInput } from "@/types/product";

const ProductUrl:string= "products";
const getAllProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get(ProductUrl);
  return data;
};
const getFilteredOrAllProducts = async (uRLSearchParams:string|null): Promise<Product[]> => {
  const { data } = await axiosInstance.get(`${ProductUrl}?q=${uRLSearchParams}`);
  return data;
};
const createProduct = async (ProductData:ProductInput) => {
  const data = await axiosInstance.post(ProductUrl, ProductData);
  return data;
};

const deleteProduct = async (ProductId: string) => {
  const data = await axiosInstance.delete(`${ProductUrl}/${ProductId}`);
  return data;
};
const updateProduct= async (updatedProduct:ProductInput,id:string) => {
  const data = await axiosInstance.put(`${ProductUrl}/${id}`,updatedProduct);
  return data;
};
export { getAllProducts, createProduct, deleteProduct,updateProduct,getFilteredOrAllProducts};
