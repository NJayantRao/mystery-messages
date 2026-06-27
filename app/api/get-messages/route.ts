import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnnect } from "@/lib/db-connnect";
import { UserModel } from "@/models/users.models";
import mongoose from "mongoose";

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
    const userId = new mongoose.Types.ObjectId(user?._id);

    const userWithMessages = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);

    if (!userWithMessages || userWithMessages.length === 0) {
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
        messages: userWithMessages[0].messages,
      },
      { status: 200 }
    );
  } catch (error) {}
}
