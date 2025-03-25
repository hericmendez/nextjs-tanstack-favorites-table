"use client";
import {columns } from "@/components/DataTable/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { useGameContext } from "@/context/GameContext";


export default function FinishedGamesPage() {
  const { finished } = useGameContext();
  
  console.log("favorites ==> ", finished);


  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={finished} />
    </div>
  );
}
