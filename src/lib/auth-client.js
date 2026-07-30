import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://market-pulse-eosin.vercel.app",
});

export const { signIn, signUp, useSession, signOut } = authClient;