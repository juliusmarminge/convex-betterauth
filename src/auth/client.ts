import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { anonymousClient, jwtClient, oidcClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { ConvexProviderWithAuth } from "convex/react";
import { useCallback } from "react";
import { getConvexToken } from "./get-convex-token";
import { auth } from "./server";

export const authClient = createAuthClient({
  plugins: [anonymousClient(), jwtClient(), oidcClient()],
});

export const sessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: async () => {
    const session = await authClient.getSession();
    return session.data;
  },
});

export const jwtQueryOptions = queryOptions({
  queryKey: ["jwt"],
  queryFn: async () => {
    const jwt = await getConvexToken();
    if ("error" in jwt) throw new Error(jwt.error);
    return jwt.data;
  },
});

export const getServerSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({
    headers: getWebRequest()?.headers ?? new Headers(),
  });
  return session;
});

export function useAuthForConvex(): ReturnType<
  React.ComponentProps<typeof ConvexProviderWithAuth>["useAuth"]
> {
  const queryClient = useQueryClient();
  const sessionQuery = useQuery(sessionQueryOptions);
  const jwtQuery = useQuery(jwtQueryOptions);

  const fetchAccessToken = useCallback(
    async (args: { forceRefreshToken: boolean }) => {
      if (!sessionQuery.data) return null;

      if (args.forceRefreshToken) {
        return queryClient.fetchQuery(jwtQueryOptions);
      }
      return queryClient.ensureQueryData(jwtQueryOptions);
    },
    [queryClient, sessionQuery.data],
  );

  return {
    isLoading: sessionQuery.isPending || jwtQuery.isPending,
    isAuthenticated: sessionQuery.data !== null,
    fetchAccessToken,
  };
}
