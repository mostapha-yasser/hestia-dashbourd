import { ObjectId } from 'mongodb';

export interface Admin {
  _id: ObjectId;
  username:string
  email: string;
  password: string;

}
