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

let createField = async function() {
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
    let fieldRes = await axios.post(
      apiUrl + "/field",
      {
        name: "new Field 1",
        description: "just a new field",
        type: "text",
        appId: "xxx",
        options: {}
      },
      { headers: headers }
    );
    //console.log(res);
    console.log(fieldRes.status);
    console.log(fieldRes.statusText);
    console.log(fieldRes.data);
    return fieldRes.data.id;
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getFields = async function(headers) {
  try {
    let fieldRes = await axios.get(apiUrl + "/field", { headers: headers });
    //console.log(res);
    console.log(fieldRes.status);
    console.log(fieldRes.statusText);
    console.log(fieldRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getFieldsByApp = async function(headers, id) {
  try {
    let fieldRes = await axios.get(apiUrl + "/app/" + id + "/field", {
      headers: headers
    });
    //console.log(res);
    console.log(fieldRes.status);
    console.log(fieldRes.statusText);
    console.log(fieldRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getFieldById = async function(headers, id) {
  try {
    let fieldRes = await axios.get(apiUrl + "/field/" + id, {
      headers: headers
    });
    //console.log(res);
    console.log(fieldRes.status);
    console.log(fieldRes.statusText);
    console.log(fieldRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editField = async function(headers, id) {
  try {
    let fieldRes = await axios.put(
      apiUrl + "/field/" + id,
      {
        name: "new Field 2",
        description: "just a new field edited",
        type: "text",
        appId: "xxx",
        options: {}
      },
      {
        headers: headers
      }
    );
    //console.log(res);
    console.log(fieldRes.status);
    console.log(fieldRes.statusText);
    console.log(fieldRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteField = async function(headers, id) {
  try {
    let fieldRes = await axios.delete(apiUrl + "/field/" + id, {
      headers: headers
    });
    //console.log(res);
    console.log(fieldRes.status);
    console.log(fieldRes.statusText);
    console.log(fieldRes.data);
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
  console.log("Create Field Run");
  let id = await createField(headers);
  console.log("Get Fields Run");
  await getFields(headers);

  console.log("Get Fields by App Run");
  await getFieldsByApp(headers, "xxx");

  console.log("Edit Field Run");
  await editField(headers, id);
  console.log("Get Field By Id Run");
  await getFieldById(headers, id);
  console.log("Delete Field Run");
  await deleteField(headers, id);
};

run();
