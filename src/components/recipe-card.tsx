import { useState } from "react";
import { MoreVertical, Clock, Edit, Trash2, Lock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Recipe as prismaRecipe } from "@/generated/prisma";
import authClient from "@/lib/auth-client";
import { getIngredientName } from "@/utils/stringUtils";
import { difficultyConfig } from "@/utils/config";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface RecipeCardProps {
  recipe: prismaRecipe;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onTogglePrivacy?: (id: string) => void;
}

export default function RecipeCard({
  recipe,
  onDelete,
  onTogglePrivacy,
}: RecipeCardProps) {
  const { data: session } = authClient.useSession();
  const isAuthor = session?.user.id === recipe.authorId;
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    onDelete?.(recipe.id);
    setIsDeleting(false);
  };

  const handleTogglePrivacy = () => {
    onTogglePrivacy?.(recipe.id);
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-xl border-2 border-border/50 hover:border-border bg-card/50 backdrop-blur-sm h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-3">
            <Link to={`/recipe/${recipe.id}` as string} className="block">
              <h3 className="font-semibold text-lg leading-tight line-clamp-2 hover:text-primary transition-colors">
                {recipe.title}
              </h3>
            </Link>
            <div className="flex items-center gap-2 flex-wrap">
              {recipe.difficulty && (
                <Badge
                  variant="outline"
                  className={difficultyConfig[recipe.difficulty].color}
                >
                  {difficultyConfig[recipe.difficulty].label}
                </Badge>
              )}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{recipe.cookTime}</span>
              </div>
            </div>
          </div>

          {isAuthor && (
            <div className="relative h-8 w-8">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  className="rounded-full"
                  src={session.user.image || ""}
                  alt="User"
                />
                <AvatarFallback>
                  {session.user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {recipe.ingredients && recipe.ingredients.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 text-sm text-muted-foreground">
              Ingredients
            </h4>
            <div className="flex flex-wrap mb-2 gap-1.5">
              {recipe.ingredients.slice(0, 2).map((ingredient, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs py-1 px-0 bg-muted/50 hover:bg-muted/70 transition-colors"
                >
                  {getIngredientName(ingredient)}
                </Badge>
              ))}
              {recipe.ingredients.length > 2 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2.5 py-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
                >
                  +{recipe.ingredients.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}
        <div>
          <h4 className="font-medium mb-2 text-sm text-muted-foreground">
            Overview
          </h4>
          <p className="text-sm leading-relaxed line-clamp-4">
            {recipe.overview}
          </p>
          <Link
            to={`/recipes/${recipe.id}` as string}
            className="inline-block mt-3 text-sm text-primary hover:underline"
          >
            Read more →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
