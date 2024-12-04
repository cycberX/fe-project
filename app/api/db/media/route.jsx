import path from "path";
import fs from "fs";
import db from "@/database/db.json";
import server from "@/database/server.json";
import { getAppliactions, getCollectionData, getCollections, getUser } from "@/config/db";

export async function GET(request) {
  return Response.json({ message: "welcome" });
}

export async function POST(request) {
  let message = "User Not Found | Unauthzarition";
  let status = 401;
  const body = await request.json();
  const userToken = body.info.userToken;
  const appToken = body.info.appToken;
  const collectionslug = body.info.collection
  try {
    const userExist = getUser(userToken);
    if (!userToken || !userExist) {
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
    const collections = getCollections(collectionslug,appToken);
    if (!collections) {
      return Response.json({ message, status, data: [] });
    } else {
      message = "OK";
      status = 200;
    }
    switch (body.info.method) {
      case "GET":
        const data = getCollectionData(collections.slug);
        return Response.json({ message, status, data });
        break;

      case "POST":
        const postData = body.data;
        const updatedata = {
          id:db.data.length + 1,
          collection_slug: collections.slug,
          ...postData,
        };
        db?.data.push(updatedata);
        const FilePath = path.join(process.cwd(), "/database/db.json");
        fs.writeFileSync(FilePath, JSON.stringify(db, null, 2));
        return Response.json({ message, status, updatedata });
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
    saveReq(request, body.info.method, status, message, userToken, appToken);
  }
}

export function saveReq(request, method, status, message, userToken, appToken) {
  const { headers, url } = request;
  let origin = headers.get("origin");
  let user = getUser(userToken);
  let app = getAppliactions(appToken);
  if (!origin) origin = "Testing";
  if (!user) user = "Unauth";
  if (!app) app = "No App";
  console.log(request);
  const newReq = {
    id: server.api.length + 1,
    origin,
    method,
    status,
    target:url,
    message,
    user,
  };
  server.api.unshift(newReq);
  const FilePath = path.join(process.cwd(), "/database/server.json");
  fs.writeFileSync(FilePath, JSON.stringify(server, null, 2));
  return {
    origin,
    url,
  };
}

