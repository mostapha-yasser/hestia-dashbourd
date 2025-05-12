import { Collection, Db, ObjectId, WithId } from "mongodb";
import { DBUser, User, UserInput } from "@/types/user";
import { connectToDatabase } from "@/lib/mongodb";
import { encrypt } from "@/lib/session";

export class UsersModel {
  private collection: Collection<DBUser>;
  private static instance: UsersModel;

  private constructor(db: Db) {
    this.collection = db.collection<DBUser>("users");
  }

  static async getInstance(): Promise<UsersModel> {
    if (!UsersModel.instance) {
      const { db } = await connectToDatabase("main");
      UsersModel.instance = new UsersModel(db);
    }
    return UsersModel.instance;
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const User = await this.collection.findOne({ email });
      return User ? this.toResponse(User) : null;
    } catch {
      return null;
    }
  }



  async verifyUser(userLoginData: {
    email: string;
    password: unknown;
  }) {
    try {
      const { email, password } = userLoginData;
      const user = await this.findByEmail(email);
      if (!user) {
        return { verified: false, error: " Invalid Email Or Password" };
      }

      const isPasswordValid = password === user.password;
      if (!isPasswordValid) {
        return { verified: false, error: " Invalid Email Or Password" };
      }

      const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);

      const payload = {
        userId: user._id,
        expiresAt,
      };



      const token = encrypt(payload);
      return { verified: true, token: token }

    } catch {
      return { verified: false, error: "error to login please try again " };
    }
  }




  async create(UsersData: UserInput) {

    const isEmailAlreadyInDb= !!this.findByEmail(UsersData.email)
    if(isEmailAlreadyInDb){return {success:false,message:"This Email Is Already Used"}}
    const now = new Date();
    const dbUser: DBUser = {
      _id: new ObjectId(),
      fullName: UsersData.fullName,
      address: UsersData.address,
      email: UsersData.email,
      password: UsersData.password,
      city: UsersData.city,
      phone: UsersData.phone,
      whatsApp: UsersData.whatsApp,
      createdAt: now,
      governorate:UsersData.governorate
    };
     await this.collection.insertOne(dbUser);

     const session=await this.verifyUser({email:UsersData.email,password:UsersData.password})
    return {success:true,message:"Successful To create Session ",session}
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch {
      return false;
    }
  }

  async initIndexes() {
    await this.collection.createIndex({
      name: "text",
      description: "text",
    });
  }

  private toResponse(dbUsers: WithId<DBUser>): User {
    return {
      _id: dbUsers._id.toString(),
      fullName: dbUsers.fullName,
      address: dbUsers.address,
      email: dbUsers.email,
      password: dbUsers.password,
      city: dbUsers.city,
      governorate: dbUsers.governorate,
      phone: dbUsers.phone,
      whatsApp: dbUsers.whatsApp,
      createdAt: dbUsers.createdAt,
    };
  }
}
