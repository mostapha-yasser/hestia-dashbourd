import { ObjectId } from 'mongodb';
export interface Price {
  price: number;
  size: "190"|"180"|"150";
}
export interface Product {
  _id: string;
  name: string;
  prices: Price[];
  category: "jar" | "mold";
  shortDesc: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ProductDB {
  _id: ObjectId;
  name: string;
  prices: Price[];
  category: "jar" | "mold";
  shortDesc: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface ProductInput {
  _id:string | undefined
  name: string;
  prices: Price[];
  category: "jar" | "mold";
  shortDesc: string;
  description: string;
  imageUrl: string;

}

export interface ProductFormInterface {
  headerContent: string;
  productBeforeEdit: Product | undefined;
  handleNewProductAction: (payload: FormData) => void;
  state:
    | {
        errors: {
          name?: string[];
          imageUrl?: string[];
          price?: string[];
          category?: string[];
          description?: string[];
          id?: string[];
        };
        error?: undefined;
      }
    | {
        error: string;
        errors?: undefined;
      }
    | undefined;
  toggleModifyModel: (product: undefined) => void;
}