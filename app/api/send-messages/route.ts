import { dbConnnect } from "@/lib/db-connnect";
import { Message } from "@/models/messages.models";
import { UserModel } from "@/models/users.models";

export async function POST(request: Request) {
  try {
    await dbConnnect();

    const { username, content } = await request.json();

    const user = await UserModel.findOne({ username });

    if (!user) {
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

    if (!user.isAcceptingMessages) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting messsages",
        },
        {
          status: 403,
        }
      );
    }

    const newMessage = { content };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    console.error("Error sending message:", err);

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
