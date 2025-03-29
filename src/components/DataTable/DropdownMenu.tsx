"use client";
import { FC } from "react";
import { usePathname } from 'next/navigation';

import { MoreHorizontal } from "lucide-react";
import { Game } from "../../@types/Game";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useGameContext } from "@/context/GameContext";



interface DataTableDropdownMenuProps {
  game: Game;
}

const DataTableDropdownMenu: FC<DataTableDropdownMenuProps> = ({ game }) => {
  const { addGameToList, removeGameFromList } = useGameContext();
/*   const pathname = window.location.pathname.split("/").filter(Boolean).pop()
 */  const pathname = usePathname();

    const currentPath = pathname.split("/").filter(Boolean).pop()
    console.log("pathname ==> ", currentPath);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
    
        <DropdownMenuLabel>Adicionar a:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => addGameToList(game, "favorites")}>
          ⭐Favoritos
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => addGameToList(game, "finished")}>
          ✅Zerados
        </DropdownMenuItem>
        {currentPath!=="backlog"&&<DropdownMenuItem onClick={() => addGameToList(game, "backlog")}>
          📋Backlog
        </DropdownMenuItem>}
        <DropdownMenuItem>🎮Jogando</DropdownMenuItem>
        <DropdownMenuItem>👎Dropados</DropdownMenuItem>
        <DropdownMenuItem>🎁Lista de desejos</DropdownMenuItem>

        <DropdownMenuItem onClick={() => pathname && removeGameFromList(String(game.id), currentPath as "backlog"| "finished"| "favorites")}>
         ❌ Remover de {currentPath}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DataTableDropdownMenu;
