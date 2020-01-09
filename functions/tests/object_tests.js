const axios = require("axios");

let apiUrl =
  "https://us-central1-web-app-automation-f9ad3.cloudfunctions.net/api";

let login = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    return headers;
  } catch (err) {
    console.error(err);
  }
  return "";
};

let createObject = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    };
    let objRes = await axios.post(
      apiUrl + "/obj",
      {
        name: "new Object 1",
        description: "just a new obj",
        type: "text",
        appId: "xxx",
        options: {}
      },
      { headers: headers }
    );
    //console.log(res);
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
    return objRes.data.id;
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getObjects = async function(headers) {
  try {
    let objRes = await axios.get(apiUrl + "/obj", { headers: headers });
    //console.log(res);
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getObjectsByApp = async function(headers, id) {
  try {
    let objRes = await axios.get(apiUrl + "/app/" + id + "/obj", {
      headers: headers
    });
    //console.log(res);
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getObjectById = async function(headers, id) {
  try {
    let objRes = await axios.get(apiUrl + "/obj/" + id, {
      headers: headers
    });
    //console.log(res);
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editObject = async function(headers, id) {
  try {
    let objRes = await axios.put(
      apiUrl + "/obj/" + id,
      {
        name: "new Object 2",
        description: "just a new obj edited",
        type: "text",
        appId: "xxx",
        options: {}
      },
      {
        headers: headers
      }
    );
    //console.log(res);
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteObject = async function(headers, id) {
  try {
    let objRes = await axios.delete(apiUrl + "/obj/" + id, {
      headers: headers
    });
    //console.log(res);
    console.log(objRes.status);
    console.log(objRes.statusText);
    console.log(objRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Object Run");
  let id = await createObject(headers);
  console.log("Get Objects Run");
  await getObjects(headers);

  console.log("Get Objects by App Run");
  await getObjectsByApp(headers, "xxx");

  console.log("Edit Object Run");
  await editObject(headers, id);
  console.log("Get Object By Id Run");
  await getObjectById(headers, id);
  console.log("Delete Object Run");
  await deleteObject(headers, id);
};

run();
