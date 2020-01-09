const { getFieldParams } = require("./util");

exports.generateController = (bigName, smallName) => {
    return `const { db } = require("../../util/admin");
const {
  create${bigName}Service,
  get${bigName}sService,
  get${bigName}ByIdService,
  edit${bigName}Service,
  delete${bigName}Service
} = require("./${smallName}_service");

exports.create${bigName} = async (req, res) => {
  try {
    let resp = await create${bigName}Service(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on create${bigName}" });
  }
};

exports.get${bigName}s = async (req, res) => {
  try {
    let resp = await get${bigName}sService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on get${bigName}s" });
  }
};

exports.get${bigName}ById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      ${smallName}Id: req.params.${smallName}Id
    };
    let resp = await get${bigName}ByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on get${bigName}ById" });
  }
};

exports.edit${bigName} = async (req, res) => {
  try {
    const params = {
      ...req.body,
      ${smallName}Id: req.params.${smallName}Id
    };
    let resp = await edit${bigName}Service(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on edit${bigName}Service", message: err });
  }
};

exports.delete${bigName} = async (req, res) => {
  const params = {
    ${smallName}Id: req.params.${smallName}Id
  };
  try {
    let resp = await delete${bigName}Service(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on edit${bigName}Service" });
  }
};
`;
};

exports.generateControllerTests = (bigName, smallName, fields, apiUrl) => {
    const fieldParams = getFieldParams(fields, {
      prefix: "",
      tabLevel: 2,
      generateValues: true
    });
  return `const axios = require("axios");

let apiUrl =
  "${apiUrl}";

let login = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${token}\`
    };
    return headers;
  } catch (err) {
    console.error(err);
  }
  return "";
};

let create${bigName} = async function() {
  try {
    let res = await axios.post(apiUrl + "/login", {
      email: "user5@email.com",
      password: "123456"
    });
    const token = res.data.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${token}\`
    };
    let ${smallName}Res = await axios.post(
      apiUrl + "/${smallName}",
      {
        name: "new ${bigName} 1",
        description: "just a new ${smallName}",
        ${fieldParams},
        username: "user5"
      },
      { headers: headers }
    );
    console.log(${smallName}Res.status);
    console.log(${smallName}Res.statusText);
    console.log(${smallName}Res.data);
    return ${smallName}Res.data.id;
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let get${bigName}s = async function(headers) {
  try {
    let ${smallName}Res = await axios.get(apiUrl + "/${smallName}", { headers: headers });
    console.log(${smallName}Res.status);
    console.log(${smallName}Res.statusText);
    console.log(${smallName}Res.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let get${bigName}ById = async function(headers, id) {
  try {
    let ${smallName}Res = await axios.get(apiUrl + "/${smallName}/" + id, {
      headers: headers
    });
    console.log(${smallName}Res.status);
    console.log(${smallName}Res.statusText);
    console.log(${smallName}Res.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let edit${bigName} = async function(headers, id) {
  try {
    let ${smallName}Res = await axios.put(
      apiUrl + "/${smallName}/" + id,
      {
        name: "new ${bigName} 2",
        description: "just a new ${smallName} edited",
        ${fieldParams},
        username: "user5"
      },
      {
        headers: headers
      }
    );
    console.log(${smallName}Res.status);
    console.log(${smallName}Res.statusText);
    console.log(${smallName}Res.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let delete${bigName} = async function(headers, id) {
  try {
    let ${smallName}Res = await axios.delete(apiUrl + "/${smallName}/" + id, {
      headers: headers
    });
    console.log(${smallName}Res.status);
    console.log(${smallName}Res.statusText);
    console.log(${smallName}Res.data);
  } catch (err) {
    console.error(err.response.status);
    console.error(err.response.statusText);
    console.error(err.response.data);
  }
};

let run = async function() {
  console.log("Login");
  let headers = await login();
  console.log("Create ${bigName} Run");
  let id = await create${bigName}(headers);
  console.log("Get ${bigName}s Run");
  await get${bigName}s(headers);
  console.log("Get ${bigName} by Id Run");
  await get${bigName}ById(headers, id);
  console.log("Edit ${bigName} Run");
  await edit${bigName}(headers, id);
  console.log("Delete ${bigName} Run");
  await delete${bigName}(headers, id);
};

run();
`;
}