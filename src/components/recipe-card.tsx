import { useState } from "react";
import { MoreVertical, Clock, Edit, Trash2, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Recipe as prismaRecipe } from "@/generated/prisma";
import authClient from "@/lib/auth-client";

interface RecipeCardProps {
  recipe: prismaRecipe;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onTogglePrivacy?: (id: string) => void;
}

const difficultyConfig = {
  EASY: {
    color: "bg-green-100 text-green-800 border-green-200",
    label: "Easy",
  },
  MEDIUM: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    label: "Medium",
  },
  HARD: { color: "bg-red-100 text-red-800 border-red-200", label: "Hard" },
};

export default function RecipeCard({
  recipe,
  onEdit,
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

  const handleEdit = () => {
    onEdit?.(recipe.id);
  };

  const handleTogglePrivacy = () => {
    onTogglePrivacy?.(recipe.id);
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg h-full">
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
              {recipe.isPublic && (
                <Badge variant="outline" className="bg-gray-100 text-gray-600">
                  <Lock className="mr-1 h-3 w-3" />
                  Private
                </Badge>
              )}
            </div>
          </div>

          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={handleEdit}
                  className="cursor-pointer"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Recipe
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleTogglePrivacy}
                  className="cursor-pointer"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  {recipe.isPublic ? "Make Public" : "Make Private"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isDeleting ? "Deleting..." : "Delete Recipe"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div>
          <h4 className="font-medium mb-2 text-sm text-muted-foreground">
            Instructions
          </h4>
          <p className="text-sm leading-relaxed line-clamp-4">
            {recipe.instructions}
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
