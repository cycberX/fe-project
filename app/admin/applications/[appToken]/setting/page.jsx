"use client"
import { Header } from "@/components/Navbar";
import { Toast } from "@/components/Toast";
import { getDB } from "@/config/db";
import { Button } from "@/ui/Button";
import { Box, Card } from "@/ui/Card";
import { Input } from "@/ui/Inputs";
import { useRouter } from "next/navigation";

export default function page({ params }) {
  const Router = useRouter();
  const { applications } = getDB("token", params.appToken, false);
  const { collections } = getDB("appToken", params.appToken, true);
  const handleDelete = async(type,key) =>{
    const res = await fetch("/api/server/db", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        method: "DELETE",
        type: type,
        data: {
          id:key
        },
      }),
    });
    if (res.ok) {
      Toast(`${type} Deleted`, "success");
      Router.push("/admin/applications")
    }
  };
  return (
    <>
      <Header page="Setting" />
      <h1>Welcome to {applications.name} Admin Panel</h1>
      <p>Your app token is: {params.appToken}</p>
      <div className="d-flex">
        <Input type="text" placeholder="Rename Application" />
        <Button>Rename</Button>
      </div>
      <div className="d-flex">
        <Input type="text" placeholder="Add New Collection" />
        <Button>Add Collection</Button>
      </div>
      {JSON.stringify(applications,null,2)}
      {collections.map((collection, index) => (
        <div key={index} className="d-flex align-items-center mb-3">
          <h3>{collection.name}</h3>
          <Button onClick={()=>handleDelete("collections",collection.id)}>Delete</Button>
        </div>
      ))}
      <Box header="Delete Application">
        <Button onClick={()=>handleDelete("applications",applications.id)}>Delete</Button>
      </Box>
    </>
  );
}
