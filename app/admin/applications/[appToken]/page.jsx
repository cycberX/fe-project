"use client";
import { getDB } from "@/config/db";
import { Card, Box } from "@/ui/Card";
import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Navbar";
import { FcAddDatabase } from "react-icons/fc";
import { Windows } from "@/components/Windows";
import { Form } from "@/ui/Form";
import { Input } from "@/ui/Inputs";
import { Toast } from "@/components/Toast";
import { Modal } from "@/ui/Modal";
import { Tables } from "@/ui/Table";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const { collections } = getDB("appToken", params.appToken, true);
  return (
    <>
      <Header
        onCreate={()=>setIsModalOpen(true)}
        type="Create"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        page="Collection"
        sorting={sort}
        setSorting={setSorting}
      />
      <Modal isOpen={isModalOpen} maxWidth="1000px" style={{width:"1000px"}} onClose={() => setIsModalOpen(false)}>
                <Create params={params}/>
              </Modal>
      <div className="grid">
        <Card>
          {collections.map((c) => (
            <Link
              href={`/admin/applications/${c.appToken}/${c.slug}`}
              key={c.id}
            >
              <Box
                text="orange"
                style={{ width: "300px" }}
                header={<FcAddDatabase />}
                footer={c.createdAt}
              >
                <h2>{c.name}</h2>
                <h3>{c.slug}</h3>
              </Box>
            </Link>
          ))}
        </Card>
      </div>
    </>
  );
}

export function Create({ params }) {
  const [schema, setSchema] = useState([]);
  const [slug,setSlug] = useState("")
  const slugify = ()=>{
    setSlug(data.name.toLowerCase().replace(/\s/g, "-") + "-" + params.appToken);
  }
  const [field,setField] = useState({
    name: "",
    type: "text",
    value:""
  })
  const [data, setData] = useState({
    name: "",
    info: "",
    appToken: params.appToken,
    schema: schema,
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
        type: 'collections',
        data: {
          ...data,
          slug: slug,
        }
      })
    })
    if(res.ok){
      Toast('Collection created successfully','success')
    }
  };
  return (
    <div>
      <div>
          <Input
            type="text"
            placeholder="Name of Collection"
            icon="Name: "
            value={data.name}
            onChange={(e) => {setData({ ...data, name: e.target.value })
          slugify()}}
          />
        
          
          <Input
            type="text"
            placeholder="Information of Collection"
            icon="Information: "
            value={data.info}
            onChange={(e) => setData({ ...data, info: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Slug of Collection"
            icon="Slug: "
            value={slug}
          />
        <div>
          <label>Schema:</label>
          <div style={{display:"flex"}}>
            <Input type="text" value={field.name} onChange={(e)=>setField({...field,name:e.target.value})}/>
            <select value={field.type} onChange={(e)=>setField({...field,type:e.target.value})}>
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="date">Date</option>
            </select>
            <Input type="text" value={field.value} onChange={(e)=>setField({...field,value:e.target.value})}/>
            <button onClick={()=>setField({name:"",type:"text",required:false,value:""})}>Clear Field</button>
            <button onClick={()=>{
              const exist = schema.find(f=> f.name === field.name && f.value === field.value)
              if(exist) {
                Toast("Field already exists",'error')
                return;
              }else if(field.name === "" && field.value === ""){
                Toast("Field name and value are required",'error')
                return;
              }else{
                schema.push(field)
                setField({name:"",type:"text",required:false,value:""})
                Toast("field Added")
              }
              }}>Add Field</button>
          </div>
        </div>
        
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {schema.map((f, i) => (
                <tr key={i}>
                  <td>{f.name}</td>
                  <td>{f.type}</td>
                  <td>{f.value}</td>
                  <td onClick={()=>{
                    setSchema(schema.filter((_, index) => index!== i))
                  }}>Remove</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={()=>setData({...data,schema:[...schema,field]})}>Add Field</button>
        <button type="submit" disabled={
          data.name === "" ||
          data.info === "" ||
          data.slug === "" ||
          schema.length === 0
        } onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
}
