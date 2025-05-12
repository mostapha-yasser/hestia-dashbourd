import { z } from "zod";
import { createProduct, updateProduct } from "./apiRequest/productsApiRequest";
import { Product, ProductInput } from "@/types/product";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import client from "@/lib/queryClient";

const productSchema = z.object({
  _id: z.string().optional(),
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be at most 50 characters" })
    .trim(),

  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(200, { message: "Description must be at most 200 characters" })
    .trim(),

  shortDesc: z
    .string()
    .min(10, { message: "Description must be at least 10 characters" })
    .max(50, { message: "Description must be at most 50 characters" })
    .trim(),

  priceFor180ml: z
    .string()
    .min(1, { message: "Price is required" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Price must be a valid number with up to 2 decimal places",
    })
    .trim(),

  priceFor190ml: z
    .string()
    .min(1, { message: "Price is required" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Price must be a valid number with up to 2 decimal places",
    })
    .trim(),
  priceFor150ml: z
    .string()
    .min(1, { message: "Price is required" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Price must be a valid number with up to 2 decimal places",
    })
    .trim(),

  imageUrl: z
    .string()
    .min(1, { message: "Image URL is required" })
    .url({ message: "Image URL must be a valid URL" })
    .trim(),

  category: z
    .string()
    .min(1, { message: "Category is required" })
    .trim(),
});

export async function handleNewProduct(prevState: unknown, formData: FormData) {
  try {
    const rawData = Object.fromEntries(formData);
    const validation = productSchema.safeParse(rawData);

    let result: AxiosResponse<{ product: Product } | null>;
    if (validation.success) {
      const rawFormData = validation.data;
      const productData: ProductInput = {
        name: String(rawFormData.name),
        description: String(rawFormData.description),
        prices: [
          { price: +rawFormData.priceFor150ml, size: "150" },
          { price: +rawFormData.priceFor180ml, size: "180" },
          { price: +rawFormData.priceFor190ml, size: "190" },
        ],
        shortDesc: String(rawFormData.description),
        imageUrl: String(rawFormData.imageUrl),
        _id: rawFormData._id,
        category: rawFormData.category === "jar" ? "jar" : "mold",
      };

      if (rawFormData._id) {
        result = await updateProduct(productData, rawFormData._id);

        if (result.data && result.data.product) {
          client.invalidateQueries({ queryKey: ["Products"] });
          toast.success(`Success ${result.data.product.name} is now available`);
        } else {
          return { error: "Failed to create or update product" };
        }
      } else {
        result = await createProduct(productData);

        if (result.data && result.data.product) {
          client.invalidateQueries({ queryKey: ["Products"] });
          toast.success(`Success ${result.data.product.name} is now available`);
        } else {
          return { error: "Failed to create or update product" };
        }
      }
    } else {
      return {
        errors: validation.error.flatten().fieldErrors,
      };
    }
  } catch {
    return { error: `Failed to add product` };
  }
}
