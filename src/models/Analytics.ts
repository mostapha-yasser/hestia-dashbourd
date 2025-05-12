import { Collection, Db } from "mongodb";
import { connectToDatabase } from "../lib/mongodb";
import { AnalyticsSummary, CategoryProductCount, OrderStatusCount } from "@/types/chartData";


export class AnalyticsModel {
  private productCollection: Collection;
  private orderCollection: Collection;
  private userCollection: Collection;
  private static instance: AnalyticsModel;

  private constructor(db: Db) {
    this.productCollection = db.collection("products");
    this.orderCollection = db.collection("orders");
    this.userCollection = db.collection("users");
  }

  static async getInstance(): Promise<AnalyticsModel> {
    if (!AnalyticsModel.instance) {
      const { db } = await connectToDatabase("main");
      AnalyticsModel.instance = new AnalyticsModel(db);
    }
    return AnalyticsModel.instance;
  }

  async getTotalProducts(): Promise<number> {
    return await this.productCollection.countDocuments();
  }

  async getTotalOrders(): Promise<number> {
    return await this.orderCollection.countDocuments();
  }

  async getTotalUsers(): Promise<number> {
    return await this.userCollection.countDocuments();
  }

  async getProductsByCategory(): Promise<CategoryProductCount[]> {
    const result = await this.productCollection.aggregate<CategoryProductCount>([
      {
        $group: {
          _id: "$category",
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: 1
        }
      }
    ]).toArray();
  
    return result;
  }
  

  async getOrdersByStatue(): Promise<OrderStatusCount[]> {
    const result = await this.orderCollection.aggregate<OrderStatusCount>([
      {
        $group: {
          _id: "$orderStatus",
          numberOfOrdersPerStatue: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          statue: "$_id",
          numberOfOrdersPerStatue: 1
        }
      }
    ]).toArray();
  
    return result;
  }

  async getAnalyticsSummary(): Promise<AnalyticsSummary> {
    try {
      const [
        totalProducts,
        totalOrders,
        totalUsers,
        productsByCategory,
        ordersByStatus
      ] = await Promise.all([
        this.getTotalProducts(),
        this.getTotalOrders(),
        this.getTotalUsers(),
        this.getProductsByCategory(),
        this.getOrdersByStatue()
      ]);

      return {
        
        totalProducts,
        totalOrders,
        totalUsers,
        productsByCategory,
        ordersByStatus
      };
    } catch (error) {
      throw error;
    }
  }
}
