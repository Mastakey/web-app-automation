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

let createCode = async function() {
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
    let codeRes = await axios.post(
      apiUrl + "/code",
      {
        name: "new Code 1",
        description: "just a new code",
        type: "type value",
        code: "code value",
        objId: "objId value",
        appId: "appId value",
        username: "user5"
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getCodes = async function(headers) {
  try {
    let codeRes = await axios.get(apiUrl + "/code", { headers: headers });
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getCodeById = async function(headers, id) {
  try {
    let codeRes = await axios.get(apiUrl + "/code/" + id, {
      headers: headers
    });
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let editCode = async function(headers, id) {
  try {
    let codeRes = await axios.put(
      apiUrl + "/code/" + id,
      {
        name: "new Code 2",
        description: "just a new code edited",
        type: "type value",
        code: "code value",
        objId: "objId value",
        appId: "appId value",
        username: "user5"
      },
      {
        headers: headers
      }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let deleteCode = async function(headers, id) {
  try {
    let codeRes = await axios.delete(apiUrl + "/code/" + id, {
      headers: headers
    });
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodeService = async function(headers) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/code/service",
      {
        objId: "2oGek9MGw0c4d3B2Cezo",
        appId: ""
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodeController = async function(headers) {
  try {
    let codeRes = await axios.post(
      apiUrl + "/code/controller",
      {
        objId: "2oGek9MGw0c4d3B2Cezo",
        appId: ""
      },
      { headers: headers }
    );
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Code Run");
  let id = await createCode(headers);
  console.log("Get Codes Run");
  await getCodes(headers);
  console.log("Get Code by Id Run");
  await getCodeById(headers, id);
  console.log("Edit Code Run");
  await editCode(headers, id);
  console.log("Delete Code Run");
  await deleteCode(headers, id);
};

//run();

let runUserFunctions = async function() {
  console.log("Login");
  let headers = await login();
  //console.log("Create Code Service Run");
  //await createCodeService(headers);
  console.log("Craete Code Controller Run");
  await createCodeController(headers);
};

runUserFunctions();
