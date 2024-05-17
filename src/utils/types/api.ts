import { NextRequest } from "next/server";
import { Session } from "next-auth";

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}
