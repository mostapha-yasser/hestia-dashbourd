import { NextResponse } from "next/server";
import { ProductModel } from "../../../models/product";
import { ProductDB, ProductInput } from "../../../types/product";
import { Filter } from "mongodb";
import { verifyJWT } from "@/lib/session";

export async function GET(request: Request) {
  
  try {
    const { searchParams } = new URL(request.url);
    // const category = searchParams.get("category");
    const query = searchParams.get("q");

    const filter: Filter<ProductDB> = {};
    

    // if (category=== "mold"||category=== "jar") {
    //   filter.category = category 
    // }

    const productModel = await ProductModel.getInstance();
    await productModel.initIndexes?.();

    const products =
      Object.keys(filter).length || query
        ? await productModel.searchByQueryAndFilter(query, filter)
        : await productModel.findAll();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authResult = await verifyJWT(request);
  if (!authResult.verified) {
    return NextResponse.json(
      { error: "Authentication required", message: authResult.error },
      { status: 401 }
    );
  }

  try {
    const productData: ProductInput = await request.json();

    if (
      !productData.name ||
      !productData.prices ||
      !productData.category ||
      !productData.description
    ) {
      return NextResponse.json({ error: "missing filed" }, { status: 400 });
    }
    const productModel = await ProductModel.getInstance();
    const product = await productModel.create(productData);

    return NextResponse.json({ product }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
