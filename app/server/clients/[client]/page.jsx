import { getDB } from "@/config/db";
import { Box, Card } from "@/ui/Card";
import Link from "next/link";

export default function page({ params }) {
  const { client } = getDB("token", params.client, false);
  return (
    <>
      <div className="grid">
        <Card header="Applicatiopns">
          <div>
            <h4>Client Details:</h4>
            <h4>App Token: {client.token}</h4>
            <h4>Client Name: {client.name}</h4>
          </div>
        </Card>
        <Card header="JSON View">
          <div>
            <pre>{JSON.stringify(client, null, 2)}</pre>
          </div>
        </Card>
      </div>
    </>
  );
}
