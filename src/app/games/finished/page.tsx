"use client";
import { columns } from "@/components/DataTable/Columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { useGameContext } from "@/context/GameContext";


export default function FinishedGamesPage() {
  const { finished } = useGameContext();
  
  console.log("favorites ==> ", finished);


  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-5">Lista de jogos zerados</h1>
      <DataTable columns={columns} data={finished} />
    </div>
  );
}
