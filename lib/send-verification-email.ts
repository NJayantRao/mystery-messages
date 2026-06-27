import { resend } from "@/lib/resend";
import { VerifyOtpEmail } from "@/emails/VerificationEmail";
import { ApiResponse } from "@/types/api-response";

export async function sendVerificationEmail(
  email: string,
  username: string,
  otp: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "No Reply <noreply@contacts.jayant-dev.me>",
      to: email,
      subject: "Verification Email",
      react: VerifyOtpEmail({ username, otp }),
    });
    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (err) {
    console.log("Error sending verification email:", err);
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}
