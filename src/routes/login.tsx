import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { authClient, sessionQueryOptions } from "~/auth/client";

export const Route = createFileRoute({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.prefetchQuery(sessionQueryOptions);
  },
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();
  const { data: session } = useQuery(sessionQueryOptions);
  const [isPending, startTransition] = useTransition();

  const login = () => {
    startTransition(async () => {
      await authClient.signIn.anonymous();
      await queryClient.invalidateQueries();
    });
  };

  const logout = () => {
    startTransition(async () => {
      await authClient.signOut();
      queryClient.getQueryCache().clear();
    });
  };

  return (
    <div>
      <p>{session?.session ? `Session Id: ${session.session.id}` : "No session"}</p>
      <div className="grid">
        <button disabled={isPending} onClick={login}>
          Sign in anonymously
        </button>
        <button disabled={isPending} onClick={logout} className="secondary">
          Sign out
        </button>
      </div>
    </div>
  );
}
