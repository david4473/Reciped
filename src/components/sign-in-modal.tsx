import { Chrome } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignInSuccess: () => void;
}

export default function SignInModal({
  open,
  onOpenChange,
  onSignInSuccess,
}: SignInModalProps) {
  const { data: session, isPending, error } = authClient.useSession();

  const handleGoogleSignIn = async () => {
    try {
      authClient.signIn.social({ provider: "google" });
      onSignInSuccess();
    } catch (err) {
      console.error("Sign in failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in to create recipes</DialogTitle>
          <DialogDescription>
            You need to be signed in to create and manage your recipes. Sign in
            with your Google account to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <Button
            onClick={handleGoogleSignIn}
            disabled={isPending}
            className="w-full"
            size="lg"
          >
            <Chrome className="mr-2 h-5 w-5" />
            {isPending ? "Signing in..." : "Continue with Google"}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
