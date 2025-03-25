"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Game } from "../../types/Game";

import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "@/components/DataTable/ColumnHeader";
import DataTableDropdownMenu from "./DropdownMenu";



export const columns: ColumnDef<Game>[] = [
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
    cell: ({ row }) => {
      const game = row.original;

      return (
<DataTableDropdownMenu game={game} />
      );
    },
  },
];