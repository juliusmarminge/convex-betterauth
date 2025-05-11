import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useTransition } from "react";
import { authClient, sessionQueryOptions } from "~/auth/client";

export function UserActions() {
  const queryClient = useQueryClient();
  const { data: session } = useQuery(sessionQueryOptions);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
      await router.invalidate();
    });
  };

  return session?.session ? (
    <button disabled={isPending} onClick={logout}>
      Sign out from session <code>session:{session.session.id}</code>
    </button>
  ) : (
    <button disabled={isPending} onClick={login}>
      Sign in anonymously
    </button>
  );
}
