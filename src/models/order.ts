import { Collection, Db, Filter, ObjectId, WithId } from "mongodb";
import { DBOrder, Order, OrderInput } from "../types/order";
import { connectToDatabase } from "../lib/mongodb";

export class OrderModel {
  private collection: Collection<DBOrder>;
  private static instance: OrderModel;

  private constructor(db: Db) {
    this.collection = db.collection<DBOrder>("orders");
  }

  static async getInstance(): Promise<OrderModel> {
    if (!OrderModel.instance) {
      const { db } = await connectToDatabase("main");
      OrderModel.instance = new OrderModel(db);
    }
    return OrderModel.instance;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.collection.find().toArray();
    return orders.map(this.toResponse);
  }

  async filterOrders(filter: Filter<DBOrder> = {}): Promise<Order[]> {
    const orders = await this.collection.find(filter).toArray();
    return orders.map(this.toResponse);
  }

  async findById(id: string): Promise<Order | null> {
    try {
      const order = await this.collection.findOne({ _id: new ObjectId(id) });
      return order ? this.toResponse(order) : null;
    } catch {
      return null;
    }
  }

  async update(id: string, orderData: Partial<OrderInput>): Promise<Order | null> {
    try {
      const objectId = new ObjectId(id);
      const updateDoc: Partial<DBOrder> 
      = {
        updatedAt: new Date(),
      };
  
      if (orderData.userId !== undefined) updateDoc.userId = orderData.userId;
      if (orderData.items !== undefined) updateDoc.items = orderData.items;
      if (orderData.totalPrice !== undefined) updateDoc.totalPrice = orderData.totalPrice;
      if (orderData.orderStatus !== undefined) updateDoc.orderStatus = orderData.orderStatus;
  
      const result = await this.collection.findOneAndUpdate(
        { _id: objectId },
        { $set: updateDoc },
        { returnDocument: 'after' }
      );
  
      return result ? this.toResponse(result) : null;
    } catch  {
      return null;
    }
  }
  

  async create(orderData: OrderInput): Promise<Order> {
    const now = new Date();
    const dbOrder: DBOrder = {
      _id:  new ObjectId(),
      userId: orderData.userId,
      items: orderData.items,
      totalPrice: orderData.totalPrice,
      orderStatus: orderData.orderStatus,
      createdAt: now,
      updatedAt: now,
    };

    const result = await this.collection.insertOne(dbOrder);
    return this.toResponse({ ...dbOrder, _id: result.insertedId });
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    } catch {
      return false;
    }
  }

  private toResponse(dbOrder: WithId<DBOrder>): Order {
    return {
      _id: dbOrder._id.toString(),
      userId: dbOrder.userId,
      items: dbOrder.items,
      totalPrice: dbOrder.totalPrice,
      orderStatus: dbOrder.orderStatus,
      createdAt: dbOrder.createdAt,
      updatedAt: dbOrder.updatedAt,
    };
  }
}
