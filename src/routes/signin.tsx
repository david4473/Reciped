import { createFileRoute, redirect } from "@tanstack/react-router";
import authClient from "@/lib/auth-client";

export const Route = createFileRoute("/signin")({
  component: SignIn,
});

function SignIn() {
  const { data: session } = authClient.useSession();
  return (
    <div>
      <h1>Sign In</h1>
      {!session && (
        <button
          className="p-2 bg-black text-gray-50 rounded"
          onClick={() => authClient.signIn.social({ provider: "google" })}
        >
          Sign in
        </button>
      )}
    </div>
  );
}
