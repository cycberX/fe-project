"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Input } from "@/ui/Inputs";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Navbar({ children }) {
  return (
    <nav>
      <Form style={{ width: "50%", display: "flex" }}>
        <Input icon={<FaHome />} type="search" width="100%" />{" "}
        <Button>Search</Button>
      </Form>
    </nav>
  );
}

export function Header({ onCreate,page, type, setSearchQuery, searchQuery,sorting,setSorting }) {
  const Router = useRouter();
  return (
    <nav style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ display: "flex",alignItems:"center" }}>
        <Button onClick={() => Router.back()}>
          <FaArrowLeft />
        </Button>
        <h2>{page}</h2>
      </div>
      <div className="grid">
        <div style={{ width: "100%", display: "flex" }}>
          <Input
            icon={<FaHome />}
            type="search"
            width="100%"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {sorting ? 
          <select className="input" style={{ width: "100px" }} onChange={(e)=>setSorting({key:e.target.value,direction:'ascending'})}>
            {sorting ? sorting.map((s)=>(
              <option key={s.value} value={s.value} className="input">{s.name}</option>
            )) : ""}
          </select> : ""}
          {type? <Button  onClick={() => onCreate()}>{type}</Button>: ""}
        </div>
      </div>
    </nav>
  );
}
