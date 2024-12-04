"use client";
import { Pagination } from "@/components/Pagination";
import { getServer } from "@/config/db";
import { Card, Box } from "@/ui/Card";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function page() {
    const { api } = getServer()
  const searchParams = useSearchParams()

	const page = searchParams.get('page') ?? '1'
	const per_page = searchParams.get('per_page') ?? '4'

	const start = (Number(page) - 1) * Number(per_page)
	const end = start + Number(per_page)

	const tdata = api.slice(start,end);
  return (
    <div className="grid">
      <Card header="API's Requests">
        <Box
          text="orange"
          style={{ width: "100%" }}
          header={"icon"}
          footer={
            <Pagination
              hasNextPage={end < api.length}
              hasPrevNext={start > 0}
            />
          }
        >
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Method</th>
                <th>Client</th>
                <th>Origin</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tdata.map((c,index) => (
                <tr key={index}>
                  <td>{c.id}</td>
                  <td>{c.status}</td>
                  <td>{c.method}</td>
                  <td>{c.client.name}</td>
                  <td>{c.origin}</td>
                  <td>{c.message}</td>
                  <td>Remove</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Card>
    </div>
  );
}
