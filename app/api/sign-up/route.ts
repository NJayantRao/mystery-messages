import { dbConnnect } from "@/lib/db-connnect";
import { sendVerificationEmail } from "@/lib/send-verification-email";
import { UserModel } from "@/models/users.models";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnnect();

    const { username, email, password } = await req.json();

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    }

    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          { success: false, message: "Email already exists" },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        const verifyCodeExpiry = new Date();
        verifyCodeExpiry.setMinutes(verifyCodeExpiry.getMinutes() + 10);
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = verifyCodeExpiry;
        await existingUserByEmail.save();
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const verifyCodeExpiry = new Date();
      verifyCodeExpiry.setMinutes(verifyCodeExpiry.getMinutes() + 10);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
        messages: [],
      });

      await newUser.save();
    }

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    if (!emailResponse.success) {
      return NextResponse.json(
        { success: false, message: emailResponse?.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Verification email sent" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in Registering User:", err);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
