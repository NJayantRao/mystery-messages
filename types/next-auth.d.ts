import { DefaultSession } from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    _id: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
  }

  interface Session {
    user: DefaultSession["user"] & {
      _id: string;
      username: string;
      isVerified: boolean;
      isAcceptingMessages: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    _id: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessages: boolean;
  }
}
