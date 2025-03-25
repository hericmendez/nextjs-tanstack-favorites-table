"use client";
import {columns } from "@/components/DataTable/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { useGameContext } from "@/context/GameContext";


export default function BacklogPage() {
  const { backlog } = useGameContext();
  
  console.log("backlog ==> ", backlog);


  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-5">Lista de jogos na fila</h1>
      <DataTable columns={columns} data={backlog} />
    </div>
  );
}
