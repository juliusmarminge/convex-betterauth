import type { QueryClient } from "@tanstack/react-query";
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import { getServerSession, sessionQueryOptions } from "~/auth/client";
import { UserActions } from "~/components/user-actions";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    links: [
      { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" },
    ],
  }),
  loader: ({ context: { queryClient } }) => {
    // Start fetching the session eagerly on the server and put it in the query cache
    const query = queryClient.getQueryCache().build(queryClient, sessionQueryOptions as any);
    void query.fetch(undefined, { initialPromise: getServerSession() });
  },
  component: RootComponent,
  notFoundComponent: () => <h1>404</h1>,
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div>
        <h1>An error occurred</h1>
        <pre>{error.message}</pre>
        <button onClick={reset}>Reset</button>
      </div>
    );
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        <nav className="container">
          <div className="grid">
            <Link to="/" activeProps={{ "aria-current": "page" }} style={{ width: "200px" }}>
              Counter
            </Link>
            <Link
              to="/protected"
              activeProps={{ "aria-current": "page" }}
              style={{ width: "200px" }}
            >
              Protected
            </Link>
          </div>
          <UserActions />
        </nav>
        <main className="container">{children}</main>
        <TanStackRouterDevtools position="bottom-right" />
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
