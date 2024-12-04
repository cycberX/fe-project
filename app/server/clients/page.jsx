import { getDB } from "@/config/db";
import { Box, Card } from "@/ui/Card";
import Link from "next/link";

export default function page() {
    const { client } = getDB()
  return (
    <>
      <Card header="Applicatiopns">
        {client.map((a, index) => (
          <Link href={`/server/clients/${a.token}`} key={index}>
            <Box
              text="orange"
              style={{ width: "300px" }}
              header={"icon"}
              footer={a.name}
            >
              <h2>{a.name}</h2>
              <h3>{a.token}</h3>
            </Box>
          </Link>
        ))}
      </Card>
    </>
  );
}
