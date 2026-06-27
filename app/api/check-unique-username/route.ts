import { dbConnnect } from "@/lib/db-connnect";
import { UserModel } from "@/models/users.models";
import { usernameValidation } from "@/validations/sign-up.schema";
import { z } from "zod";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  try {
    await dbConnnect();

    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username") || "",
    };

    const result = usernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Invalid username",
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existingUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUsername) {
      return Response.json(
        {
          success: false,
          message: "Username already taken",
        },
        { status: 405 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Username available",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in Username checking", err);
    return Response.json(
      { success: false, message: "Error in Username checking" },
      { status: 500 }
    );
  }
}
