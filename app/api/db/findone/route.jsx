import path from "path";
import fs from "fs";
import db from "@/database/db.json";
import server from "@/database/server.json";
import {
  getAppliactions,
  getCollectionData,
  getCollections,
  getUser,
} from "@/config/db";

export async function GET(request) {
  return Response.json({ message: "welcome" });
}

export async function POST(request) {
  let message = "User Not Found | Unauthzarition";
  let status = 401;
  const body = await request.json();
  const clientToken = body.info.clientToken;
  const appToken = body.info.appToken;
  const collectionslug = body.info.collection;
  try {
    const userExist = getUser(clientToken);
    console.log(userExist, clientToken);
    if (!clientToken || !userExist) {
      return Response.json({ message, status, data: [] });
    } else {
      message = "AppToken Invalid | Not Found Application";
      status = 301;
    }
    const app = getAppliactions(appToken);
    if (!app) {
      return Response.json({ message, status, data: [] });
    } else {
      message = "Collection Not Found | invaild Collection name";
      status = 301;
    }
    const collections = getCollections(collectionslug, appToken);
    if (!collections) {
      return Response.json({ message, status, data: [] });
    } else {
      message = "OK";
      status = 200;
    }
    switch (body.info.method) {
      case "GET":
        const datas = getCollectionData(collections.slug);
        let data;
        if (body.query) {
          const [key, value] = Object.entries(body.query)[0];
          data = datas.find((item) => item[key] === value);
        } else {
          data = datas;
        }
        return Response.json({ message, status, data });
        break;

      case "POST":
        const postData = body.data;
        const updatedata = {
          id: db.data.length + 1,
          collection_slug: collections.slug,
          ...postData,
        };
        db?.data.push(updatedata);
        const FilePath = path.join(process.cwd(), "/database/db.json");
        fs.writeFileSync(FilePath, JSON.stringify(db, null, 2));
        return Response.json({ message, status, updatedata });
        break;

      case "PUT":
        const putData = body.data;
        const putId = body.query?.id;
        if (!putId) {
          return Response.json({
            message: "ID is required for update",
            status: 400,
            data: [],
          });
        }
        let putedItem;
        db.data = db.data.map((item) => {
          if (
            item.id === putId &&
            item.collection_slug === collections.slug
          ) {
            putedItem = { ...item, ...putData };
            return putedItem;
          }
          return item;
        });
        if (!putedItem) {
          return Response.json({
            message: "Item not found",
            status: 404,
            data: [],
          });
        }
        const PutFilePath = path.join(process.cwd(), "/database/db.json");
        fs.writeFileSync(PutFilePath, JSON.stringify(db, null, 2));
        return Response.json({ message, status, data: putedItem });
        break;

      case "DELETE":
        const deleteId = body.query?.id;
        if (!deleteId) {
          return Response.json({
            message: "ID is required for deletion",
            status: 400,
            data: [],
          });
        }
        let deletedItem;
        db.data = db.data.filter((item) => {
          if (
            item.id === deleteId &&
            item.collection_slug === collections.slug
          ) {
            deletedItem = item;
            return false;
          }
          return true;
        });
        if (!deletedItem) {
          return Response.json({
            message: "Item not found",
            status: 404,
            data: [],
          });
        }
        const DeleteFilePath = path.join(process.cwd(), "/database/db.json");
        fs.writeFileSync(DeleteFilePath, JSON.stringify(db, null, 2));
        return Response.json({ message, status, data: deletedItem });
        break;

      case "PATCH":
        const patchData = body.data;
        const updateId = body.query?.id;
        if (!updateId) {
          return Response.json({
            message: "ID is required for update",
            status: 400,
            data: [],
          });
        }
        let updatedItem;
        db.data = db.data.map((item) => {
          if (
            item.id === updateId &&
            item.collection_slug === collections.slug
          ) {
            updatedItem = { ...item, ...patchData };
            return updatedItem;
          }
          return item;
        });
        if (!updatedItem) {
          return Response.json({
            message: "Item not found",
            status: 404,
            data: [],
          });
        }
        const PatchFilePath = path.join(process.cwd(), "/database/db.json");
        fs.writeFileSync(PatchFilePath, JSON.stringify(db, null, 2));
        return Response.json({ message, status, data: updatedItem });
        break;

      default:
        return Response.json({
          message: "Method Not Allowed ",
          status: 301,
          data: [],
        });
        break;
    }
  } catch (error) {
    message = "intnal server error";
    status = 500;
    console.log(error);
  } finally {
    saveReq(request, body.info.method, status, message, clientToken, appToken);
  }
}

export function saveReq(
  request,
  method,
  status,
  message,
  clientToken,
  appToken
) {
  const { headers, url } = request;
  let origin = headers.get("origin");
  let client = getUser(clientToken);
  let app = getAppliactions(appToken);
  if (!origin) origin = "Testing";
  if (!client) client = "Unauth";
  if (!app) app = "No App";
  const newReq = {
    id: server.api.length + 1,
    origin,
    method,
    status,
    target: url,
    message,
    client,
  };
  server.api.unshift(newReq);
  const FilePath = path.join(process.cwd(), "/database/server.json");
  fs.writeFileSync(FilePath, JSON.stringify(server, null, 2));
  return {
    origin,
    url,
  };
}
