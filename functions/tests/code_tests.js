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
        name: "NavBar",
        description: "Nav Bar for app",
        type: "NavBar",
        appId: "W00gGoPoWbTjDEul6u2d"
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

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create Code Run");
  //let id = await createCode();
  let id = "W00gGoPoWbTjDEul6u2d";
  console.log("Get Code By App Run");
  await getCodeByApp(headers, id);

};

run();
