import { createServerFileRoute } from "@tanstack/react-start/server";
import { auth } from "~/auth/server";

export const ServerRoute = createServerFileRoute().methods({
  GET: ({ request }) =>
    auth.handler(request).catch((err) => {
      console.error(err);
      if (err instanceof Error && err.message === "Unauthorized") {
        return new Response("Unauthorized", { status: 401 });
      }
      throw err;
    }),
  POST: ({ request }) =>
    auth.handler(request).catch((err) => {
      console.error(err);
      if (err instanceof Error && err.message === "Unauthorized") {
        return new Response("Unauthorized", { status: 401 });
      }
      throw err;
    }),
});
