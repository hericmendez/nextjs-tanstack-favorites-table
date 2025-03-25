"use client";
import {columns } from "@/components/DataTable/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { useGameContext } from "@/context/GameContext";


export default function BacklogPage() {
  const { backlog } = useGameContext();
  
  console.log("backlog ==> ", backlog);


  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={backlog} />
    </div>
  );
}
