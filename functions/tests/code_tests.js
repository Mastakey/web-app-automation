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

let createCode = async function(type, appId, objId) {
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
        name: type,
        description: "test",
        type: type,
        appId: appId,
        objId: objId
      },
      { headers: headers }
    );
    //console.log(res);
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let createCodeTests = async function(headers, appId, objId){
  try {
    let codeRes = await axios.post(
      apiUrl + "/code/tests",
      {
        name: "tests",
        description: "tests",
        username: "user5",
        type: "tests",
        appId: appId,
        objId: objId
      },
      { headers: headers }
    );
    //console.log(res);
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
    return codeRes.data.id;
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
}

let editCode = async function(headers, type, appId, objId, id){
  try {
    let codeRes = await axios.put(
      apiUrl + "/code/" + id,
      {
        name: type,
        description: "test edited",
        type: type,
        appId: appId,
        objId: objId
      },
      {
        headers: headers
      }
    );
    //console.log(res);
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
}

let getCodeByApp = async function(headers, id) {
  try {
    let codeRes = await axios.get(apiUrl + "/app/" + id + "/code", {
      headers: headers
    });
    //console.log(res);
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
  } catch (err) {
    //console.error(err);
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let getCodeByObj = async function(headers, id) {
  try {
    let codeRes = await axios.get(apiUrl + "/obj/" + id + "/code", {
      headers: headers
    });
    //console.log(res);
    console.log(codeRes.status);
    console.log(codeRes.statusText);
    console.log(codeRes.data);
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
  console.log("Create Code Run");
  await createCode("functions", "", "2oGek9MGw0c4d3B2Cezo");
  console.log("Create Code Tests Run");
  await createCodeTests(headers, "", "2oGek9MGw0c4d3B2Cezo");
  console.log("Edit Code Run");
  await editCode(headers, "functions", "", "2oGek9MGw0c4d3B2Cezo", id);
  console.log("Get Code By App Run");
  await getCodeByApp(headers, "1mOfAE0RRpn356OU5pmg");
  console.log("Get Code By Obj Run");
  await getCodeByObj(headers, "2oGek9MGw0c4d3B2Cezo");
};

run();
