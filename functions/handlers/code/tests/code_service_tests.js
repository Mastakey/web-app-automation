var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "http://test"
});
const db = admin.firestore();

const {
  createCodeService,
  getCodesService,
  getCodeByIdService,
  editCodeService,
  deleteCodeService,
  createCodeServiceService,
  createCodeControllerService,
  createCodeRouteService,
  getCodesByObjIdService,
  getCodesByAppIdService,
  createReducerService,
  createPageRoutesService,
  createActionService,
  createComponentService,
  createAppjsService,
  deleteAllCodesByAppId
} = require("../code_service");

let createCodeTest = async () => {
  const params = {
    name: "test code",
    description: "test code desc",
    type: "type value",
    code: "code value",
    objId: "objId value",
    appId: "appId value"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getCodesTest = async () => {
  try {
    const params = {};
    const user = {
      username: "user5"
    };
    let resp = await getCodesService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getCodeByIdTest = async codeId => {
  try {
    const params = {
      codeId: codeId
    };
    let resp = await getCodeByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let editCodeTest = async codeId => {
  const params = {
    name: "test code edited",
    description: "test code desc edited",
    codeId: codeId,
    type: "type value",
    code: "code value",
    objId: "objId value",
    appId: "appId value"
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await editCodeService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let deleteCodeTest = async codeId => {
  const params = {
    codeId: codeId
  };
  try {
    let resp = await deleteCodeService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let createCodeServiceServiceTest = async () => {
  const params = {
    name: "test code",
    description: "test code desc",
    type: "service",
    objId: "2oGek9MGw0c4d3B2Cezo",
    appId: ""
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeServiceService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let createCodeControllerServiceTest = async () => {
  const params = {
    name: "test code",
    description: "test code desc",
    type: "service",
    objId: "2oGek9MGw0c4d3B2Cezo",
    appId: ""
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeControllerService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let getCodesByObjIdTest = async () => {
  try {
    const params = {
      objId: "2oGek9MGw0c4d3B2Cezo"
    };
    const user = {
      username: "user5"
    };
    let resp = await getCodesByObjIdService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let getCodesByAppIdTest = async () => {
  try {
    const params = {
      appId: "1mOfAE0RRpn356OU5pmg"
    };
    const user = {
      username: "user5"
    };
    let resp = await getCodesByAppIdService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create Code");
  let codeId = await createCodeTest();
  console.log("Get Codes");
  await getCodesTest();
  console.log("Get Code by Id");
  await getCodeByIdTest(codeId);
  console.log("Edit Code");
  await editCodeTest(codeId);
  console.log("Delete Code");
  await deleteCodeTest(codeId);
};

//run();

let codeServiceRun = async () => {
  console.log("Create Service Code");
  await createCodeServiceServiceTest();
  console.log("Create Controller Code");
  await createCodeControllerServiceTest();
};

//codeServiceRun();

let getCodesByObjIdRun = () => {
  console.log("Get Codes by objId");
  getCodesByObjIdTest();
};

//getCodesByObjIdRun();

let getCodesByAppIdRun = () => {
  console.log("Get Codes by appId");
  getCodesByAppIdTest();
};

//getCodesByAppIdRun();

let createCodeRouteServiceTest = async () => {
  const params = {
    objId: "1mOfAE0RRpn356OU5pmg"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createCodeRouteService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

//createCodeRouteServiceTest();

//reducer
let createReducerServiceTest = async () => {
  const params = {
    appId: "1mOfAE0RRpn356OU5pmg"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createReducerService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

//createReducerServiceTest();

//routes
let createPageRoutesServiceTest = async () => {
  const params = {
    appId: "1mOfAE0RRpn356OU5pmg"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createPageRoutesService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

//createPageRoutesServiceTest();

//actions
let createActionServiceTest = async () => {
  const params = {
    appId: "1mOfAE0RRpn356OU5pmg"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createActionService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

//createActionServiceTest();

//components
let createComponentServiceTest = async () => {
  const params = {
    appId: "1mOfAE0RRpn356OU5pmg"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createComponentService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

//createComponentServiceTest();

let createAppjsServiceTest = async () => {
  const params = {
    appId: "1mOfAE0RRpn356OU5pmg"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await createAppjsService(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

//createAppjsServiceTest();

let deleteAllCodesTest = async () => {
  const params = {
    appId: "1mOfAE0RRpn356OU5pmg"
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await deleteAllCodes(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

deleteAllCodesTest();