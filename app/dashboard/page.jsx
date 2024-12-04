"use client";
import { Pagination } from "@/components/Pagination";
import { Toast } from "@/components/Toast";
import { Button } from "@/ui/Button";
import { Box, Card } from "@/ui/Card";
import { Tables } from "@/ui/Table";
import { useSearchParams } from "next/navigation";
import { FaAddressBook, FaHome } from "react-icons/fa";

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'city', label: 'City' }
];

const sampleData = [
  { name: 'Alice', age: 25, city: 'New York' },
  { name: 'Bob', age: 30, city: 'San Francisco' },
  { name: 'Charlie', age: 35, city: 'Chicago' },
  { name: 'David', age: 40, city: 'Los Angeles' },
  { name: 'Eve', age: 45, city: 'Miami' },
  { name: 'Frank', age: 50, city: 'Dallas' },
]


export default function page() {
  // const searchParams = useSearchParams();

  // const page = searchParams.get("page") ?? "1";
  // const per_page = searchParams.get("per_page") ?? "4";

  // const start = (Number(page) - 1) * Number(per_page);
  // const end = start + Number(per_page);

  // const tdata = data.slice(start, end);
  return (
    <>
      <div className="grid">
        <Card header="Testing" summary="Sale Summary">
          <Box
            header={<FaAddressBook />}
            footer="+5% Profit Today"
            style={{ width: "200px" }}
            text="orange"
          >
            <h3>$700k</h3>
            <h2>Orders</h2>
          </Box>
          <Box
            header={<FaAddressBook />}
            footer="+5% Profit Today"
            style={{ width: "200px" }}
            text="lightgreen"
          >
            <h3>$700k</h3>
            <h2>Orders</h2>
          </Box>
        </Card>
        <Card header="Testing" summary="Sale Summary">
          <Box
            header={<FaAddressBook />}
            footer="+5% Profit Today"
            style={{ width: "200px" }}
            text="orange"
          >
            <h3>$700k</h3>
            <h2>Orders</h2>
          </Box>
          <Box
            header={<FaAddressBook />}
            footer="+5% Profit Today"
            style={{ width: "200px" }}
            text="orange"
          >
            <h3>$700k</h3>
            <h2>Orders</h2>
          </Box>
        </Card>
      </div>
      {/* <Button onClick={() => Toast("ok")}>OK</Button> */}
      <Card header="Table Testing" style={{ width: "50%" }}>
        {/* <div className="table-box">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>image</th>
                <th>Name</th>
                <th>email</th>
                <th>phone</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {tdata.map((d) => (
                <tr>
                  <td>{d.id}</td>
                  <td></td>
                  <td>{d.name}</td>
                  <td>{d.email}</td>
                  <td>{d.contact}</td>
                  <td>{d.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination hasNextPage={end < data.length} hasPrevNext={start > 0} />
        </div> */}
        <Tables data={sampleData} columns={columns}/>
      </Card>
    </>
  );
}
