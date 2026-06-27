import { z } from "zod";
import { usernameValidation } from "./sign-up.schema";

export const verifyCodeSchema = z.object({
  username: usernameValidation,
  code: z.string().length(6, "Verification code must be 6 characters"),
});
