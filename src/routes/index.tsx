import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../convex/_generated/api";

export const Route = createFileRoute({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(convexQuery(api.counter.get, {}));
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { data: counter } = useQuery(convexQuery(api.counter.get, {}));
  const increment = useMutation({
    mutationFn: useConvexMutation(api.counter.increment).withOptimisticUpdate((localStore) => {
      const current = localStore.getQuery(api.counter.get, {});
      if (!current) return;

      localStore.setQuery(
        api.counter.get,
        {},
        {
          ...current,
          value: current.value + 1n,
        },
      );
    }),
  });

  return (
    <button
      className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      onClick={() => increment.mutate({})}
      type="button"
    >
      Clicks: {counter?.value ?? 0}
    </button>
  );
}
