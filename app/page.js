"use client";
import styles from "@/styles/page.module.css";
import { Button } from "@/ui/Button";
import { Input } from "@/ui/Inputs";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";



export default function Home() {
  const [data,setdata] = useState([])
  useEffect(()=>{
    
  },[])
  return (
    <main className={styles.main}>
      <Suspense>
        <details><summary></summary></details>
      <h1>Welcome to server</h1>
      <pre>{JSON.stringify(data,null,2)}</pre>
      </Suspense>
      <Image src="http://localhost:8000/media/images/image/_lyricalguy_-20240104-0002.jpg" width={100} height={100}/>
    </main>
  );
}
