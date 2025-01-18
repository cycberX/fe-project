import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import db from '@/database/db.json'

function getImageDimensions(buffer){
  // PNG dimension extraction
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    return { width, height };
  }
  
  // JPEG dimension extraction
  if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[buffer.length - 2] === 0xFF && buffer[buffer.length - 1] === 0xD9) {
    let offset = 2;
    while (offset < buffer.length) {
      const marker = buffer.readUInt16BE(offset);
      offset += 2;
      
      if (marker === 0xFFC0 || marker === 0xFFC2) {
        const height = buffer.readUInt16BE(offset + 3);
        const width = buffer.readUInt16BE(offset + 5);
        return { width, height };
      }
      
      const segmentLength = buffer.readUInt16BE(offset);
      offset += segmentLength;
    }
  }
  
  return null;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file')
    const name = formData.get('name')

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });

    const ext = path.extname(file.name);
    const filename = `${name}-${Date.now()}${ext}`;
    const filePath = path.join(uploadDir, filename);

    let dimensions = null;
    if (file.type.startsWith('image/')) {
      dimensions = getImageDimensions(buffer);
    }

    const fileDetails = {
        id: new Date().getTime(),
        createdAt: new Date(),
        updatedAt: new Date(),
        name: filename,
        originalName: file.name,
        type: file.type,
        size: file.size,
        path: `/uploads/${filename}`,
        ...(dimensions && { dimensions })
      }

      db.media.push(fileDetails)
      const dbPath = path.join(process.cwd(),'database','db.json')

      // Save file to disk and update database
      await fs.writeFile(filePath, buffer);
      await fs.writeFile(dbPath,JSON.stringify(db,null,2));
    return NextResponse.json({ 
      message: 'File uploaded successfully',
      fileDetails
    });

  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ 
      error: 'File upload failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
