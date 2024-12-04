"use client";
import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function Layout({ children }) {
  const [style, setStyle] = useState({
    marginLeft: "15%",
    width: "85%",
  });

  // useEffect(()=>{
  //   if (typeof window !== "undefined") {
  //     require("@/styles/js/bootstrap.js");
  //   }
  // }, []);
  return (
    <main style={{ display: "flex" }}>
      <Sidebar setNavStyle={setStyle} />
      <div style={style}>
        <div style={{ padding: "1rem" }}>
          {children}
        </div>
      </div>
    </main>
  );
}
