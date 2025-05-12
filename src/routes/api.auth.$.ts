import { createServerFileRoute } from "@tanstack/react-start/server";
import { auth } from "~/auth/server";

const wrapHandler = (handler: (request: Request) => Promise<Response>) => {
  return (event: { request: Request }) => {
    return handler(event.request).catch((err) => {
      console.error(err);
      if (err instanceof Error && err.message === "Unauthorized") {
        return new Response("Unauthorized", { status: 401 });
      }
      return new Response("Internal Server Error", { status: 500 });
    });
  };
};

export const ServerRoute = createServerFileRoute().methods({
  GET: wrapHandler(auth.handler),
  POST: wrapHandler(auth.handler),
});
