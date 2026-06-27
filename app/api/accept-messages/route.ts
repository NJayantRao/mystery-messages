import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnnect } from "@/lib/db-connnect";
import { UserModel } from "@/models/users.models";

export async function POST(request: Request) {
  try {
    await dbConnnect();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized request",
        },
        {
          status: 401,
        }
      );
    }
    const userId = user?._id;
    const { acceptMessages } = await request.json();

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessages: acceptMessages,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message acceptance updated successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error updating user:", err);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(request: Request) {
  try {
    await dbConnnect();

    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!session || !user) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized request",
        },
        {
          status: 401,
        }
      );
    }
    const userId = user?._id;

    const existingUser = await UserModel.findById({ userId });

    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }
    return Response.json(
      {
        success: true,
        isAcceptingMessages: existingUser.isAcceptingMessages,
        message: "Message acceptance status fetched successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error fetching data:", err);

    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
