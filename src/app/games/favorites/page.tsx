"use client";
import {columns } from "@/components/DataTable/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { useGameContext } from "@/context/GameContext";


export default function FavoritesPage() {
  const { favorites } = useGameContext();
  
  console.log("favorites ==> ", favorites);


  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-5">Lista de Favoritos</h1>
      <DataTable columns={columns} data={favorites} />
    </div>
  );
}
