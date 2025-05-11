import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import { sessionQueryOptions } from "~/auth/client";
import { auth } from "~/auth/server";

const getServerSession = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({
    headers: getWebRequest()?.headers ?? new Headers(),
  });
  return session;
});

export const Route = createFileRoute({
  beforeLoad: async ({ context }) => {
    const serverSession = await getServerSession();
    if (!serverSession) {
      throw redirect({ to: "/login" });
    }

    context.queryClient.setQueryData(sessionQueryOptions.queryKey, serverSession);

    return { session: serverSession };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: session } = useSuspenseQuery(sessionQueryOptions);

  return (
    <pre>
      <code>{JSON.stringify(session, null, 2)}</code>
    </pre>
  );
}
