import { convexAdapter } from "@better-auth-kit/convex";
import { betterAuth } from "better-auth";
import { genericOAuthClient } from "better-auth/client/plugins";
import { anonymous, jwt, oidcProvider } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";
import { ConvexHttpClient } from "convex/browser";

const convexClient = new ConvexHttpClient(import.meta.env.VITE_CONVEX_URL, {
  logger: false,
});

export const ALGORITHM = "RS256";
export const AUDIENCE = "convex";
export const ISSUER = `${import.meta.env.VITE_SITE_URL?.includes("localhost") ? "http" : "https"}://${import.meta.env.VITE_SITE_URL}/api/auth`;
export const BETTER_AUTH_SECRET = "YAveJvxbFhEFVWGms0BzRplxkja3UTLP"; // TODO: Move to .env

export const auth = betterAuth({
  secret: BETTER_AUTH_SECRET,
  database: convexAdapter(convexClient),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  plugins: [
    anonymous(),
    jwt({
      jwks: {
        keyPairConfig: {
          alg: ALGORITHM,
        },
      },
    }),
    oidcProvider({
      loginPage: "/login",
      metadata: {
        issuer: ISSUER,
      },
    }),
    genericOAuthClient(),
    reactStartCookies(), // make sure this is the last plugin in the array
  ],
});
