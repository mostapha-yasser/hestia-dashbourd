import { ObjectId } from "mongodb";

export interface DBUser {
  _id: ObjectId;
  fullName: string;
  address: string;
  email: string;
  password: string;
  city: string;
  governorate: string;
  phone: string;
  whatsApp: string;
  createdAt: Date;
}

export interface User {
  _id: string ;
  fullName: string;
  address: string;
  email: string;
  password: string;
  city: string;
  governorate: string;
  phone: string;
  whatsApp: string;
  createdAt: Date;
}


export interface UserInput {
  fullName: string;
  address: string;
  email: string;
  password: string;
  city: string;
  governorate: string;
  phone: string;
  whatsApp: string;
}

export interface UserInputLogin {
  email: string;
  password: string;
}