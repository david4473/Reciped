import { ChefHat, LogOut, Pizza } from "lucide-react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import authClient from "@/lib/auth-client";
import { useState } from "react";
import SignInModal from "./SignInModal";

export function Header() {
  const { data: session } = authClient.useSession();
  const navigate = useNavigate();
  const router = useRouter();

  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleCreateRecipe = () => {
    if (session) {
      navigate({ to: "/add-recipe" });
    } else {
      setShowSignInModal(true);
    }
  };

  const handleSignInSuccess = () => {
    setShowSignInModal(false);
    navigate({ to: "/add-recipe" });
  };

  const handleSignOut = () => {
    authClient.signOut().then(() => {
      router.invalidate();
    });
  };

  return (
    <header className="sticky mx-auto top-0 z-50 max-w-7xl *: border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <ChefHat className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Reciped</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleCreateRecipe}>Add Recipe</Button>
          {session && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.image || ""} alt="User" />
                      <AvatarFallback>
                        {session.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{session.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/my-recipes" className="cursor-pointer">
                      <Pizza className="mr-2 h-4 w-4" />
                      <span>My Recipes</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-destructive focus:text-destructive"
                    onClick={handleSignOut}
                  >
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <SignInModal
            open={showSignInModal}
            onOpenChange={setShowSignInModal}
            onSignInSuccess={handleSignInSuccess}
          />
        </div>
      </div>
    </header>
  );
}
