"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Game } from "../../@types/Game";
import Image from "next/image";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "@/components/DataTable/ColumnHeader";
import DataTableDropdownMenu from "./DropdownMenu";
import GameDisc from "@/assets/images/game_disc.png";
import DrawerModal from "../DrawerModal";

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
      const {
        name,
        platform,
        genre,
        rating,
        developer,
        release_date,
        description,
      } = row.original;
      function getYearFromDate(dateString: string): string {
        const date = new Date(dateString);
        return date.getFullYear().toString();
      }
      return (
        <div className="flex flex-row justify-start">
          <div className="h-10 w-10 mr-2">
            <DrawerModal
              title={name}
              element={
                <button onClick={() => console.log(row.original)}>
                  <Image
                    className="hover:opacity-50"
                    src={GameDisc}
                    alt="disc img"
                  />
                </button>
              }
            >
              <div className="flex flex-col justify-start">
                <ol>
                  <li>
                    <strong>Plataforma: {platform}</strong>
                  </li>
                  <li>
                    <strong>Gênero: {genre}</strong>
                  </li>
                  <li>
                    <strong>Nota geral:{rating}</strong>
                  </li>
                  <li>
                    <strong>Desenvolvedor: {developer}</strong>
                  </li>
                  <li>
                    <strong>
                      Data de lançamento:{getYearFromDate(release_date)}
                    </strong>
                  </li>
                  <li>
                    <strong>Descrição: {description}</strong>
                  </li>
                </ol>
              </div>
            </DrawerModal>
          </div>
          <div className="flex flex-col mr-5">
            <strong>{name}</strong>

            <span className="text-sm text-gray-500">
              {developer}, {getYearFromDate(release_date)}
            </span>
          </div>
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

      return <DataTableDropdownMenu game={game} />;
    },
  },
];