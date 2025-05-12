import { ObjectId } from 'mongodb';

export interface Category {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CategoryDB {
  _id: ObjectId;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}



export interface CategoryInput {
  name: string;
  description: string;
  imageUrl: string;
}