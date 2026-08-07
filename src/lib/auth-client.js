import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "https://dokanpat.vercel.app",
});

export const { signIn, signUp, useSession, signOut } = authClient;