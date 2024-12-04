"use client";
import { Header } from "@/components/Navbar";
import { getDB } from "@/config/db";
import { Box, Card } from "@/ui/Card";
import Link from "next/link";
import React, { useState, useMemo } from 'react'
import { FcEngineering } from "react-icons/fc";
import { Windows } from "@/components/Windows";
import { Form } from "@/ui/Form";
import { FloatableInput, Input } from "@/ui/Inputs";
import { Toast } from "@/components/Toast";
import { Button } from "@/ui/Button";
import { Modal } from "@/ui/Modal";
import { FaAdjust, FaUser } from "react-icons/fa";

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
export default function page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState("");
  const { applications } = getDB();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })
  const sortedApplications = useMemo(() => {
    let sortableItems = [...applications]
    if (sortConfig.key!== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending'? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending'? 1 : -1
        }
        return 0
      })
    }
    return sortableItems
  }, [applications, sortConfig])
  return (
    <>
      <Header
        onCreate={()=>setIsModalOpen(true)}
        type="Create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        page="Application"
        sorting={sort}
        setSorting={setSortConfig}
      />
              <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Create/>
              </Modal>
              {sortConfig.key}{sortConfig.direction}
      <div className="grid">
        <Card>
          {sortedApplications
            .filter((d) => {
              return searchQuery.toLowerCase() === ""
                ? d
                : d.name.toLowerCase().includes(searchQuery);
            })
            .map((a, index) => (
              <Link href={`/admin/applications/${a.token}`} key={index}>
                <Box
                  text="orange"
                  style={{ width: "300px" }}
                  header={<FcEngineering />}
                  footer={a.createdAt}
                >
                  <h2>{a.name}</h2>
                  <span>{a.client.name}</span>
                  <p>{a.status ? "Active" : "Not Active"}</p>
                </Box>
              </Link>
            ))}
        </Card>
      </div>
    </>
  );
}

export function Create() {
  // code for creating a new application goes here
  const [data, setData] = useState({
    name: "",
    client: {
      name: "",
    },
    token: new Date().getTime(),
    status: false,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/server/db',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        method: 'POST',
        type: 'applications',
        data: data
      })
    })
    if(res.ok){
      Toast('Collection created successfully','success')
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={data.name}
        label="Name"
        placeholder="Name of application"
        icon={<FaAdjust/>}
        onChange={(e) =>
          setData({
            ...data,
            name: e.target.value,
          })
        }
      />
      <Input
        value={data.client.name}
        label=""
        placeholder="Clinet Name"
        icon={<FaUser/>}
        onChange={(e) =>{
          setData({
            ...data,
            client: {
             ...data.client,
              name: e.target.value,
            },
          })
        }}/>

        <Button type="submit">Create</Button>
    </Form>
  );
}
