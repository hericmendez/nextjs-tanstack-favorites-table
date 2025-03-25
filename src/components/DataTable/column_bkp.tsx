"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Game } from "@/types/Game";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "@/components/DataTable/ColumnHeader";



export const getColumns = (addGameToList: (game: Game, listName: 'finished' | 'favorites' | 'backlog') => void, data: Game[]): ColumnDef<Game>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const { name, developer, release_date } = row.original;
      function getYearFromDate(dateString: string): string {
        const date = new Date(dateString);
        return date.getFullYear().toString();
      }
      return (
        <div className="flex flex-col mr-5">
          <strong>{name}</strong>

          <span className="text-sm text-gray-500">
            {developer}, {getYearFromDate(release_date)}
          </span>
        </div>
      );
    },
    sortingFn: "alphanumeric", // Define a função de ordenação
  },
  {
    accessorKey: "platform",
    header: "Platform",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const game = row.original;
      const { addGameToList, removeGame } = table.options.meta as {
        addGame: (game: Game) => void;
        removeGame: (game: Game) => void;
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => addGameToList(game, "favorites")}>Add Game</DropdownMenuItem>
            <DropdownMenuItem onClick={() => removeGame(game)}>Remove Game</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }}
];
