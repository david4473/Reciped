import { auth } from "@/lib/auth-server/better-auth";
import { createServerFileRoute } from "@tanstack/react-start/server";
import { _ } from "node_modules/better-auth/dist/shared/better-auth.BTuiucL9";

export const APIRoute = createServerFileRoute().methods({
  GET: ({ request }) => {
    return auth.handler(request);
  },
  POST: ({ request }) => {
    return auth.handler(request);
  },
});
