import db from "@/database/db.json";
import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET(request) {
  return Response.json({ data: db });
}

export async function POST(request) {
  let message = "Internal server error";
  const body = await request.json();
  const type = body.type;
  const method = body.method;
  const FilePath = path.join(process.cwd(), "/database/db.json");
  switch (method) {
    case "POST":
      const data = {
        id: new Date().getTime(),
        ...body.data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: "active",
      };
      const res = db[type].unshift(data);
      fs.writeFileSync(FilePath, JSON.stringify(db, null, 2));
      return NextResponse.json({ message: "ok", index: res });
      break;

    case "PUT":
      const updatedata = {
        id: body.data.id,
        ...body.data.data,
        updatedAt: new Date().toISOString(),
      };
      const index = db[type].findIndex((item) => item.id === updatedata.id);
      if (index > -1) {
        db[type][index] = updatedata;
        fs.writeFileSync(FilePath, JSON.stringify(db, null, 2));
        message = "Data updated successfully";
      } else {
        message = "Data not found";
      }
      return NextResponse.json({ message });
      break;

    case "DELETE":
      const deletedata = {
        id: body.data.id,
      };
      console.log(deletedata,type,method)
      const deletedIndex = db[type].findIndex(
        (item) => item.id === deletedata.id
      );
      if (deletedIndex > -1) {
        db[type].splice(deletedIndex, 1);
        fs.writeFileSync(FilePath, JSON.stringify(db, null, 2));
        message = "Data deleted successfully";
      } else {
        message = "Data not found";
      }
      return NextResponse.json({ message });
      break;

    case "PATCH":
      const patchData = body.data;
      db[type].forEach((item) => {
        if (item.id === patchData.id) {
          for (const key in patchData) {
            item[key] = patchData[key];
          }
          item.updatedAt = new Date().toISOString();
        }
      });
      fs.writeFileSync(FilePath, JSON.stringify(db, null, 2));
      message = "Data updated successfully";
      return NextResponse.json({ message });
      break;

    default:
      message = "Method not allowed";
      return NextResponse.json({ message });
      break;
  }
}
