import { Toast } from "@/components/Toast";
import db from "@/database/db.json";
import server from "@/database/server.json";

export function getAppliactions(token) {
  if (token) {
    return db.applications.find((a) => a.token === token);
  } else {
    return db.applications;
  }
}

export function getUser(token) {
  return db.client.find((u) => u.token === token);
}

export function getCollections(slug, appToken) {
  if (slug && appToken) {
    return db.collections.find(
      (a) => a.slug === slug && a.appToken === appToken
    );
  } else {
    return db.collections;
  }
}

export function getCollectionData(slug) {
  return db.data.filter((d) => d.collection_slug === slug);
}

export function getDB(type, value, many) {
  let data, collections, client,applications;
  if (many === true) {
    data = db.data.filter((d) => d[type] === value);
    applications = db.applications.filter((d) => d[type] === value);
    collections = db.collections.filter((d) => d[type] === value);
    client = db.client.filter((d) => d[type] === value);
  } else if (many === false) {
    data = db.data.find((d) => d[type] === parseInt(value));
    applications = db.applications.find((d) => d[type] === parseInt(value));
    collections = db.collections.find((d) => d[type] === value);
    client = db.client.find((d) => d[type] === value);
  } else if (type === undefined) {
    data = db.data;
    client = db.client;
    applications = db.applications;
  }else{
    Toast("No data Found")
  }
  return {
    data: data,
    collections: collections,
    applications: applications,
    client: client,
    media: db.media,
  };
}

export function getServer() {
  return { api: server.api };
}

export function getDBCampair(obj){
  let data, collections, client,applications;
  data = db.data.filter((d) => d.collection_slug === obj.collection_slug && d.apptoken === obj.apptoken);
  applications = db.applications.filter((d) => d.token === obj.apptoken);
  collections = db.collections.filter((d) => d.slug === obj.collection_slug && d.appToken === obj.apptoken);
  client = db.client.filter((d) => d.token === obj.apptoken);
  return {
    data: data,
    collections: collections,
    applications: applications,
    client: client,
    media: db.media,
  };
}
