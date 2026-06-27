import { dbConnnect } from "@/lib/db-connnect";
import { UserModel } from "@/models/users.models";
import { verifyCodeSchema } from "@/validations/verify-code.schema";

export async function POST(request: Request) {
  try {
    await dbConnnect();

    const { username, code } = await request.json();

    const verifyCodeQuery = {
      username,
      code,
    };

    const result = verifyCodeSchema.safeParse(verifyCodeQuery);
    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Invalid input",
        },
        {
          status: 400,
        }
      );
    }

    const user = await UserModel.findOne({ username });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const isCodeValid = user?.verifyCode === code;
    const isCodeExpired = new Date(user.verifyCodeExpiry) < new Date();

    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code. Please try again",
        },
        {
          status: 400,
        }
      );
    } else if (isCodeExpired) {
      return Response.json(
        {
          success: false,
          message: "Verification code has expired. Please try again",
        },
        {
          status: 400,
        }
      );
    }

    user.isVerified = true;
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Email verified successfully",
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error in Verifying user", err);
    return Response.json(
      { success: false, message: "Error in Verifying user" },
      { status: 500 }
    );
  }
}
