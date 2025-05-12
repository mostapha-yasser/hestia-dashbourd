import { Collection, Db, ObjectId, WithId } from "mongodb";
import { connectToDatabase } from "../lib/mongodb";
import { DBUser, User } from "./user";

export class userModel {
  private collection: Collection<DBUser>;
  private static instance: userModel;

  private constructor(db: Db) {
    this.collection = db.collection<DBUser>("users");
  }

  static async getInstance(): Promise<userModel> {
    if (!userModel.instance) {
      const { db } = await connectToDatabase("main");
      userModel.instance = new userModel(db);
    }
    return userModel.instance;
  }


 async findById(id: string): Promise<User | null> {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  
  try {
    const user = await this.collection.findOne({ _id: new ObjectId(id) });
    return user ? this.toResponse(user) : null;
  } catch (error) {
    console.error('Error finding user by ID:', error);
    return null;
  }
}

  private toResponse(dbUser: WithId<DBUser>): User {
    return {
      _id: dbUser._id.toString(),
      address: dbUser.address,
      city: dbUser.city,
      email: dbUser.email,
      fullName: dbUser.fullName,
      createdAt: dbUser.createdAt,
      governorate:dbUser.governorate,
      password:dbUser.password,
      phone:dbUser.phone,
      whatsApp:dbUser.whatsApp
    };
  }
}
