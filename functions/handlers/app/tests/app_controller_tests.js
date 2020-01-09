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

let createApp = async function() {
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
    let appRes = await axios.post(
      apiUrl + "/app",
      {
        name: "new App 1",
        description: "just a new app",
        username: "user5"
      },
      { headers: headers }
    );
    console.log(appRes.status);
    console.log(appRes.statusText);
    console.log(appRes.data);
    return appRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getApps = async function(headers) {
  try {
    let appRes = await axios.get(apiUrl + "/app", { headers: headers });
    console.log(appRes.status);
    console.log(appRes.statusText);
    console.log(appRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getAppById = async function(headers, id) {
  try {
    let appRes = await axios.get(apiUrl + "/app/" + id, {
      headers: headers
    });
    console.log(appRes.status);
    console.log(appRes.statusText);
    console.log(appRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editApp = async function(headers, id) {
  try {
    let appRes = await axios.put(
      apiUrl + "/app/" + id,
      {
        name: "new App 2",
        description: "just a new app edited",
        apiUrl: "new url",
        databaseURL: "new db url"
      },
      {
        headers: headers
      }
    );
    console.log(appRes.status);
    console.log(appRes.statusText);
    console.log(appRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteApp = async function(headers, id) {
  try {
    let appRes = await axios.delete(apiUrl + "/app/" + id, {
      headers: headers
    });
    console.log(appRes.status);
    console.log(appRes.statusText);
    console.log(appRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create App Run");
  let id = await createApp(headers);
  console.log("Get Apps Run");
  await getApps(headers);
  console.log("Get App by Id Run");
  await getAppById(headers, id);
  console.log("Edit App Run");
  await editApp(headers, id);
  console.log("Delete App Run");
  await deleteApp(headers, id);
};

run();
