"use client";
import { Pagination } from "@/components/Pagination";
import { getDB } from "@/config/db";
import { Card, Box } from "@/ui/Card";
import Link from "next/link";
import { Header } from "@/components/Navbar";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Windows } from "@/components/Windows";
import { Form } from "@/ui/Form";
import { Input } from "@/ui/Inputs";
import { Toast } from "@/components/Toast";
import { Button } from "@/ui/Button";

const sort = [
  {
    name: "Name",
    value: "name",
  },
  {
    name: "Id",
    value: "id",
  },
];
export default function page({ params }) {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState("");
  const handleShow = () => {
    setShow(!show);
  };

  const { data } = getDB("collection_slug", params.collections, true);
  const { collections } = getDB("slug", params.collections, false);
  const searchParams = useSearchParams();
  const path = usePathname();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "4";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const tdata = data.slice(start, end);

  if (!collections.schema) {
    return <div>Loading...{JSON.stringify(collections)}</div>;
  }
  return (
    <>
      <Header
        onCreate={handleShow}
        type="Create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        page="Collection"
        sorting={sort}
        setSorting={setSorting}
      />
      {show && (
        <Windows onClose={handleShow} title="Upload Image">
          <Create collection={collections} />
        </Windows>
      )}
      <div className="grid">
        <Card header="Data">
          <Box
            text="orange"
            style={{ width: "100%" }}
            header={"icon"}
            footer={
              <Pagination
                hasNextPage={end < data.length}
                hasPrevNext={start > 0}
              />
            }
          >
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  {collections.schema.map((s, index) => (
                    <th key={index}>{s.name}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tdata.map((c, index) => (
                  <tr key={index}>
                    <td>{c.id}</td>
                    {collections.schema.map((s, index) => (
                      <td key={index}>{c[s.value]}</td>
                    ))}
                    <td>
                      <Link href={`${path}/${c.id}`}>view</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Card>
      </div>
    </>
  );
}

export function Create({ collection }) {
  const [data, setData] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/server/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "POST",
        type: "data",
        data: {
          ...data,
          collection_slug: collection.slug,
        },
      }),
    });
    if (res.ok) {
      Toast("data created successfully", "success");
    }
  };
  return (
    <>
      {collection.schema.map((f) => (
        <Form key={f.name}>
          <Input
            type="text"
            placeholder={f.name}
            value={data[f.value] || ""}
            onChange={(e) => setData({ ...data, [f.value]: e.target.value })}
          />
        </Form>
      ))}
      <Button onClick={handleSubmit}>Create</Button>
    </>
  );
}
