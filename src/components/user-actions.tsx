import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useTransition } from "react";
import { authClient, jwtQueryOptions, sessionQueryOptions } from "~/auth/client";

export function UserActions() {
  const queryClient = useQueryClient();
  const { data: session } = useSuspenseQuery(sessionQueryOptions);
  const [isPending, startTransition] = useTransition();

  const login = () => {
    startTransition(async () => {
      await authClient.signIn.anonymous();
      await queryClient.invalidateQueries();
      await queryClient.ensureQueryData(sessionQueryOptions);
      await queryClient.ensureQueryData(jwtQueryOptions);
    });
  };

  const logout = () => {
    startTransition(async () => {
      await authClient.signOut();
      window.location.reload();
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
