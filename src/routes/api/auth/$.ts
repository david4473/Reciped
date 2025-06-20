import { createAPIFileRoute } from "@tanstack/react-start/api";
import { auth } from "@/lib/server/auth";

export const APIRoute = createAPIFileRoute("/api/auth/$")({
  GET: ({ request }: { request: Request }) => {
    return auth.handler(request);
  },
  POST: ({ request }: { request: Request }) => {
    return auth.handler(request);
  },
});
