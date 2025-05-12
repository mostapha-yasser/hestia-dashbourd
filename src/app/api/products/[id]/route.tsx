import { NextResponse } from 'next/server';
import { ProductModel } from '../../../../models/product';
import { ProductInput } from '../../../../types/product';
import { verifyJWT } from '@/lib/session';

export async function GET(
  request: Request,
  { params }: { params:Promise<{id:string}> }
) {

  const authResult = await verifyJWT(request);
  if (!authResult.verified) {
    return NextResponse.json(
      { error: "Authentication required", message: authResult.error },
      { status: 401 }
    );
  }
  
  try {
    const id = (await params).id;
    const productModel = await ProductModel.getInstance();
    const product = await productModel.findById(id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json(product);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch product' }, 
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params:Promise<{id:string}> }
) {

  const id = (await params).id;
const authResult = await verifyJWT(request);
  if (!authResult.verified) {
    return NextResponse.json(
      { error: "Authentication required", message: authResult.error },
      { status: 401 }
    );
  }
  
  try {
    const updateData: Partial<ProductInput> = await request.json();
    
    const productModel = await ProductModel.getInstance();
    const product = await productModel.update(id, updateData);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({product}, { status: 201 });
  } catch  {
    return NextResponse.json(

      { error: 'Failed to update product' }, 

      { status: 500 }
    );
  }
}

// DELETE a product
export async function DELETE(
  request: Request,
  { params }: { params:Promise<{id:string}> }
) {

  
  const authResult = await verifyJWT(request);
  if (!authResult.verified) {
    return NextResponse.json(
      { error: "Authentication required", message: authResult.error },
      { status: 401 }
    );
  }
  
  try {
    const id = (await params).id;
    const productModel = await ProductModel.getInstance();
    const deleted = await productModel.delete(id);
    
    if (!deleted) {
      return NextResponse.json(
        { error: 'Product not found' }, 
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete product' }, 
      { status: 500 }
    );
  }
}