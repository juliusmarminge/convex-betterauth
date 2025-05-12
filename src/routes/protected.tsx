import { useSuspenseQuery } from "@tanstack/react-query";
import { redirect } from "@tanstack/react-router";
import { sessionQueryOptions } from "~/auth/client";

export const Route = createFileRoute({
  loader: async ({ context: { queryClient } }) => {
    const session = await queryClient.ensureQueryData(sessionQueryOptions);
    if (!session) throw redirect({ to: "/" });
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
