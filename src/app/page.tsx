"use client";
import { columns } from "@/components/DataTable/columns";
import { DataTable } from "@/components/DataTable/data-table";
import { games } from "@/components/DataTable/data";
import { Game } from "@/types/Game";
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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
