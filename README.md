Get all Collection Data Method:GET
```json
{
  "info": {
    "method": "GET",
    "clientToken": "1234",
    "appToken": "xyz",
    "collection": "user"
  }
}
```
Post Data in collections Method:POST
```json
{
  "info": {
    "method": "POST",
    "clientToken": "1234",
    "appToken": "xyz",
    "collection": "user"
  },
  "data":{
    "name": "sanskar",
    "age": "18"
  }
}
```
Find One Data GET
```json
{
  "info": {
    "method": "GET",
    "clientToken": "1234",
    "appToken": "xyz",
    "collection": "user"
  },
  "query":{
    "id":1       //place any value
  }
}
```

Find One Data PUT

```json
{
  "info": {
    "method": "PUT",
    "clientToken": "1234",
    "appToken": "xyz",
    "collection": "user"
  },
  "query":{
    "id":"1"
  },
  "data":{
    "name": "sanskar",
    "collection_slug": "user",
    "age": "18"
  }
}
```

Patch/Update one data
```json
{
  "info": {
    "method": "PATCH",
    "clientToken": "1234",
    "appToken": "xyz",
    "collection": "user"
  },"query":{
    "id":1
  },
  "data":{
    "name": "sanskar",
    "collection_slug": "user",
    "age": "18"
  }
}
```

Delete one data
```json
{
  "info": {
    "method": "DELETE",
    "clientToken": "1234",
    "appToken": "xyz",
    "collection": "user"
  },"query":{
    "id":1
  }
}
```
