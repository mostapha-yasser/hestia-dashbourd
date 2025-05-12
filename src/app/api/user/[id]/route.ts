import { verifyJWT } from "@/lib/session";
import { userModel } from "@/models/userModel";

export async function GET(
  request: Request,
  { params }: { params:Promise<{id:string}> }
) {

  const id = (await params).id;

  const authResult = await verifyJWT(request);
  if (!authResult.verified) {
    return Response.json(
      { error: "Authentication required", message: authResult.error },
      { status: 401 }
    );
  }
  
  try {
    const activeUserModel = await userModel.getInstance();
    const user = await activeUserModel.findById(id);
    
    if (!user) {
      return Response.json(
        { error: 'User not found' }, 
        { status: 404 }
      );
    }
    
    return Response.json(user);
  } catch  {
    return Response.json(
      { error: 'Failed to fetch user' }, 
      { status: 500 }
    );
  }
}
