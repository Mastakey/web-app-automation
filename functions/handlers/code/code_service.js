const { getFieldsByObj, getObjectsByApp } = require("./code_util");
const { getAppByIdService } = require("../app/app_service");
const {
  generateService,
  generateServiceTests
} = require("../../util/codegen/backend/service");
const {
  generateController,
  generateControllerTests
} = require("../../util/codegen/backend/controller");
const { generateRoutes } = require("../../util/codegen/backend/routes");
exports.createCodeService = async (db, params, user) => {
  let date = new Date();
  const newCode = {
    name: params.name,
    description: params.description,
    username: user.username,
    type: params.type,
    code: params.code,
    objId: params.objId,
    appId: params.appId,
    createdAt: date.toUTCString(),
    createdAtTimestamp: date.getTime()
  };
  try {
    let code = await db.collection("code").add(newCode);
    let resp = newCode;
    resp.id = code.id;
    return { status: 200, response: resp };
  } catch (err) {
    throw err;
  }
};

exports.getCodesService = async (db, params, user) => {
  try {
    let allCodes = await db
      .collection("code")
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let codes = [];
    allCodes.forEach(doc => {
      codes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: codes };
  } catch (err) {
    throw err;
  }
};

exports.getCodeByIdService = async (db, params, user) => {
  try {
    let code = await db
      .collection("code")
      .doc(params.codeId)
      .get();
    if (!code.exists) {
      return { status: 404, response: { error: "code not found" } };
    }
    return { status: 200, response: { ...code.data(), id: code.id } };
  } catch (err) {
    throw err;
  }
};

exports.editCodeService = async (db, params, user) => {
  let date = new Date();
  const editCode = {
    name: params.name,
    description: params.description,
    username: user.username,
    type: params.type,
    code: params.code,
    objId: params.objId,
    appId: params.appId,
    updatedAt: date.toUTCString(),
    updatedAtTimestamp: date.getTime()
  };
  try {
    let code = await db.doc(`/code/${params.codeId}`).get();
    if (!code.exists) {
      return { status: 404, response: { error: "code not found" } };
    }
    await code.ref.update(editCode);
    return { status: 200, response: editCode };
  } catch (err) {
    throw err;
  }
};

exports.deleteCodeService = async (db, params, user) => {
  try {
    const code = db.doc(`/code/${params.codeId}`);
    const doc = await code.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "code not found" } };
    }
    await code.delete();
    return { status: 200, response: { id: doc.id, message: "code deleted" } };
  } catch (err) {
    throw err;
  }
};

//Additional Functions

exports.createCodeServiceService = async (db, params, user) => {
  let date = new Date();
  let code = "";
  let codeTest = "";
  let objId = params.objId;
  let appId = params.appId;
  try {
    let obj = await db
      .collection("obj")
      .doc(objId)
      .get();
    if (!obj.exists) {
      return { status: 404, response: { error: `objId [${objId}] not found` } };
    }
    const objData = obj.data();
    const smallName = objData.name;
    const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
    if (appId === "" || appId === null) {
      appId = objData.appId;
    }
    const fields = await getFieldsByObj(db, objId);
    code = generateService(bigName, smallName, fields);
    const app = await getAppByIdService(db, { appId: appId }, user);
    const databaseURL = app.response.databaseURL;
    codeTest = generateServiceTests(bigName, smallName, fields, databaseURL);
    const newCodeService = {
      name: `${smallName}_service`,
      description: `${bigName} Service Code`,
      username: user.username,
      type: "service",
      code: code,
      appId: appId,
      objId: params.objId,
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };
    const newCodeServiceTest = {
      ...newCodeService,
      name: `${smallName}_service_tests`,
      description: `${bigName} Service Code Tests`,
      type: "test",
      code: codeTest
    };
    let codeServiceResp = newCodeService;
    let codeService = await db.collection("code").add(newCodeService);
    codeServiceResp.id = codeService.id;
    let codeServiceTestResp = newCodeServiceTest;
    let codeServiceTest = await db.collection("code").add(newCodeServiceTest);
    codeServiceTestResp.id = codeServiceTest.id;
    let resp = [codeServiceResp, codeServiceTestResp];
    return { status: 200, response: resp };
  } catch (err) {
    throw err;
  }
};

exports.createCodeControllerService = async (db, params, user) => {
  let date = new Date();
  let code = "";
  let codeTest = "";
  let objId = params.objId;
  let appId = params.appId;
  try {
    let obj = await db
      .collection("obj")
      .doc(objId)
      .get();
    if (!obj.exists) {
      return {
        status: 404,
        response: {
          error: `objId [${objId}] not found`
        }
      };
    }
    const objData = obj.data();
    const smallName = objData.name;
    const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
    if (appId === "" || appId === null) {
      appId = objData.appId;
    }
    const fields = await getFieldsByObj(db, objId);
    code = generateController(bigName, smallName, fields);
    const app = await getAppByIdService(
      db,
      {
        appId: appId
      },
      user
    );
    const databaseURL = app.response.databaseURL;
    codeTest = generateControllerTests(bigName, smallName, fields, databaseURL);
    const newCodeController = {
      name: `${smallName}_controller`,
      description: `${bigName} Controller Code`,
      username: user.username,
      type: "controller",
      code: code,
      appId: appId,
      objId: params.objId,
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };
    const newCodeControllerTest = {
      ...newCodeController,
      name: `${smallName}_controller_tests`,
      description: `${bigName} Controller Code Tests`,
      type: "test",
      code: codeTest
    };
    let codeControllerResp = newCodeController;
    let codeController = await db.collection("code").add(newCodeController);
    codeControllerResp.id = codeController.id;
    let codeControllerTestResp = newCodeControllerTest;
    let codeControllerTest = await db
      .collection("code")
      .add(newCodeControllerTest);
    codeControllerTestResp.id = codeControllerTest.id;
    let resp = [codeControllerResp, codeControllerTestResp];
    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};

exports.createCodeRouteService = async (db, params, user) => {
  let date = new Date();
  let code = "";
  let appId = params.appId;
  try {
    const objectNames = await getObjectsByApp(db, appId);
    code = generateRoutes(objectNames);
    const newCodeRoute = {
      name: `index.js`,
      description: `Route Code`,
      username: user.username,
      type: "route",
      code: code,
      appId: appId,
      objId: "",
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };

    let routeCodeObj = await db.collection("code").add(newCodeRoute);
    let codeRes = newCodeRoute;
    codeRes.id = routeCodeObj.id;
    return {
      status: 200,
      response: codeRes
    };
  } catch (err) {
    throw err;
  }
};

exports.getCodesByObjIdService = async (db, params, user) => {
  try {
    let allCodes = await db
      .collection("code")
      .where("objId", "==", params.objId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let codes = [];
    allCodes.forEach(doc => {
      codes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return { status: 200, response: codes };
  } catch (err) {
    throw err;
  }
};

exports.getCodesByAppIdService = async (db, params, user) => {
  try {
    let allCodes = await db
      .collection("code")
      .where("appId", "==", params.appId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let codes = [];
    allCodes.forEach(doc => {
      codes.push({
        id: doc.id,
        ...doc.data()
      });
    });
    return {
      status: 200,
      response: codes
    };
  } catch (err) {
    throw err;
  }
};
