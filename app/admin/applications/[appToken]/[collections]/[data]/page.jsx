"use client";
import { Header } from "@/components/Navbar";
import { getDB } from "@/config/db";
import { Card, Box } from "@/ui/Card";
import Link from "next/link";

export default function page({ params }) {
  const { data } = getDB("id", params.data, false);
  const { collections } = getDB("slug", params.collections, false);
  return (
    <>
    <Header/>
    <div className="grid">
      <Card header="HTML View" style={{ display: "block" }}>
        <div>
          <b>id:</b> {data.id}
          <br />
          {collections.schema.map((s) => (
            <div key={s.id}>
              <b>{s.name} : </b>
              {data[s.value]}
              <br />
            </div>
          ))}
          <b>Collection:</b> {data.collection_slug}
        </div>
      </Card>
      <Card header="JSON View">
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </Card>
    </div>
    </>
  );
}
