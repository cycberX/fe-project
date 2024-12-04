"use client";
import { Header } from "@/components/Navbar";
import { Windows } from "@/components/Windows";
import { Box, Card } from "@/ui/Card";
// import Image from "next/image";
import { useState } from "react";
import { Form } from "@/ui/Form";
import { Input } from "@/ui/Inputs";
import { Button } from "@/ui/Button";
import { getDB } from "@/config/db";
import { ImageBox } from "@/ui/Image";

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

export default function media() {
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sorting, setSorting] = useState("");
  const {media} = getDB()
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div>
      <Header
        onCreate={handleShow}
        type="Upload"
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        page="Media"
        sorting={sort}
        setSorting={setSorting}
      />
      {show && (
        <Windows onClose={handleShow} title="Upload Image">
          <Upload />
        </Windows>
      )}
      <Card style={{ justifyContent: "flex-start" }}>
        {media
          .filter((d) => {
            return searchQuery.toLowerCase() === ""
              ? d
              : d.name.toLowerCase().includes(searchQuery);
          })
          .map((d,index) => (
            <ImageBox image={d} key={index}/>
          ))}
      </Card>
    </div>
  );
}



export function Upload() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setUploadStatus('File too large. Max 10MB allowed.');
        return;
      }

      setFile(selectedFile);

      // Create image preview for image files
      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || name === '') {
      setUploadStatus('Please select a file and enter a name');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);

    try {
      setUploadStatus('Uploading...');
      
      const response = await fetch('/api/server/media', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus(`Upload successful: ${result.fileDetails.name}`);
      } else {
        setUploadStatus(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      setUploadStatus('Upload error');
      console.error('Upload error:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input 
          type="file"
          placeholder="Image file"
          onChange={handleFileChange}
        />

        <Input 
          type="text" 
          placeholder="Enter image name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
        />

        {imagePreview && (
          <div>
            <img 
              src={imagePreview} 
              alt="Preview" 
            />
          </div>
        )}

        <Button 
          type="submit" 
          disabled={!file || name === ''}
        >
          Upload File
        </Button>

        {uploadStatus && (
          <p>
            {uploadStatus}
          </p>
        )}
      </Form>
    </div>
  );
}