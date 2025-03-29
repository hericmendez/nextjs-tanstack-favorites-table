"use client";
import { columns } from "@/components/DataTable/Columns";
import { DataTable } from "@/components/DataTable/DataTable";
import { games } from "@/components/DataTable/data";
import { Game } from "@/@types/Game";
import { useEffect, useState } from "react";

async function getData(): Promise<Game[]> {
  return [
    ...games.map((item) => ({
      ...item,
      id: item.id.toString(),
    })),
  ];
}

export default function DemoPage() {
  const [data, setData] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getData();
      setData(fetchedData);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold my-5">Buscar jogos</h1>
      <hr />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
