const {
  getFieldsByObj,
  getObjectsByApp,
  getObjectsByAppReturnData,
  createCodeObj,
  getAppById
} = require("./code_util");
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
const {
  getReducers
} = require("../../util/codegen/frontend/redux/reducers.js");
const { getStore } = require("../../util/codegen/frontend/redux/store.js");
const { getTypes } = require("../../util/codegen/frontend/redux/types.js");
const { getActions } = require("../../util/codegen/frontend/redux/actions.js");
const { getAlls } = require("../../util/codegen/frontend/routes/all.js");
const { getCreates } = require("../../util/codegen/frontend/routes/create.js");
const { getEdits } = require("../../util/codegen/frontend/routes/edit.js");
const { getViews } = require("../../util/codegen/frontend/routes/view.js");
const {
  getAllComps
} = require("../../util/codegen/frontend/components/All.js");
const {
  getCreateComps
} = require("../../util/codegen/frontend/components/Create.js");
const {
  getEditComps
} = require("../../util/codegen/frontend/components/Edit.js");
const {
  getViewComps
} = require("../../util/codegen/frontend/components/View.js");
const { getAppjs } = require("../../util/codegen/frontend/App");

exports.createCodeService = async (db, params, user) => {
  let date = new Date();
  const newCode = {
    name: params.name,
    description: params.description,
    username: user.username,
    type: params.type,
    folder: params.folder,
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
      name: `${smallName}_service.js`,
      description: `${bigName} Service Code`,
      username: user.username,
      type: "service",
      code: code,
      folder: `functions/handlers/${smallName}/`,
      appId: appId,
      objId: params.objId,
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };
    const newCodeServiceTest = {
      ...newCodeService,
      name: `${smallName}_service_tests.js`,
      description: `${bigName} Service Code Tests`,
      type: "test",
      code: codeTest,
      folder: `functions/handlers/tests/${smallName}/`
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
    const apiUrl = app.response.apiUrl;
    codeTest = generateControllerTests(bigName, smallName, fields, apiUrl);
    const newCodeController = {
      name: `${smallName}_controller.js`,
      description: `${bigName} Controller Code`,
      username: user.username,
      type: "controller",
      code: code,
      folder: `functions/handlers/${smallName}/`,
      appId: appId,
      objId: params.objId,
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };
    const newCodeControllerTest = {
      ...newCodeController,
      name: `${smallName}_controller_tests.js`,
      description: `${bigName} Controller Code Tests`,
      type: "test",
      code: codeTest,
      folder: `functions/handlers/tests/${smallName}/`
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
  try {
    let appId = params.appId;
    //if (appId === '' || appId === undefined || appId === null){
    //  throw('missing appId');
    //}
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

//UI Functions

exports.createReducerService = async (db, params, user) => {
  let date = new Date();
  let resp = [];
  try {
    let appId = params.appId;
    //if (appId === '' || appId === undefined || appId === null){
    //  throw('missing appId');
    //}
    const objectNames = await getObjectsByApp(db, appId);
    const reducerCodes = getReducers(objectNames);
    reducerCodes.forEach(async reducerCode => {
      const newCodeReducer = {
        name: `${reducerCode.name}Reducer.js`,
        description: `object reducer`,
        username: user.username,
        type: "reducer",
        code: reducerCode.code,
        folder: 'src/redux/reducers/',
        appId: appId,
        objId: "",
        createdAt: date.toUTCString(),
        createdAtTimestamp: date.getTime()
      };

      let reducerCodeObj = await db.collection("code").add(newCodeReducer);
      let codeRes = newCodeReducer;
      codeRes.id = reducerCodeObj.id;
      resp.push(codeRes);
    });

    //store
    const storeCode = getStore(objectNames);
    const newCodeStore = {
      name: `store.js`,
      description: `redux store`,
      username: user.username,
      type: "store",
      code: storeCode,
      folder: "src/redux/",
      appId: appId,
      objId: "",
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };

    let storeCodeObj = await db.collection("code").add(newCodeStore);
    let codeResStore = newCodeStore;
    codeResStore.id = storeCodeObj.id;
    resp.push(codeResStore);

    //type
    const typeCode = getTypes(objectNames);
    const newCodeType = {
      name: `type.js`,
      description: `redux types`,
      username: user.username,
      type: "type",
      code: typeCode,
      folder: "src/redux/",
      appId: appId,
      objId: "",
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };

    let typeCodeObj = await db.collection("code").add(newCodeType);
    let codeResType = newCodeType;
    codeResType.id = typeCodeObj.id;
    resp.push(codeResType);

    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};

exports.createActionService = async (db, params, user) => {
  let date = new Date();
  let resp = [];
  try {
    let appId = params.appId;
    const objectNames = await getObjectsByApp(db, appId);
    const actionCodes = getActions(objectNames);
    actionCodes.forEach(async actionCode => {
      const newCodeActions = {
        name: `${actionCode.name}Actions.js`,
        description: `object actions`,
        username: user.username,
        type: "actions",
        code: actionCode.code,
        folder: "src/redux/actions/",
        appId: appId,
        objId: "",
        createdAt: date.toUTCString(),
        createdAtTimestamp: date.getTime()
      };

      let actionCodeObj = await db.collection("code").add(newCodeActions);
      let codeRes = newCodeActions;
      codeRes.id = actionCodeObj.id;
      resp.push(codeRes);
    });
    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};

exports.createPageRoutesService = async (db, params, user) => {
  let date = new Date();
  let resp = [];
  try {
    let appId = params.appId;
    const objectNames = await getObjectsByApp(db, appId);
    const objectData = await getObjectsByAppReturnData(db, appId);
    const getAllPages = getAlls(objectNames);
    const getCreatePages = getCreates(objectNames);
    const getViewPages = getViews(objectNames);
    getAllPages.forEach(async page => {
      let codeRes = await createCodeObj(
        db,
        date,
        `${page.name}All.js`,
        "object actions",
        "actions",
        page.code,
        `src/routes/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    });

    getCreatePages.forEach(async page => {
      let codeRes = await createCodeObj(
        db,
        date,
        `${page.name}Create.js`,
        "object actions",
        "actions",
        page.code,
        `src/routes/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    });

    let editData = [];
    for (var i = 0; i < objectData.length; i++) {
      const obj = objectData[i];
      const fields = await getFieldsByObj(db, obj.id);
      editData.push({
        name: obj.name,
        fields: fields
      });
    }
    const getEditPages = getEdits(editData);
    await getEditPages.forEach(async page => {
      let codeRes = await createCodeObj(
        db,
        date,
        `${page.name}Edit.js`,
        "object actions",
        "actions",
        page.code,
        `src/routes/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    });

    getViewPages.forEach(async page => {
      let codeRes = await createCodeObj(
        db,
        date,
        `${page.name}View.js`,
        "object actions",
        "actions",
        page.code,
        `src/routes/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    });

    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};

exports.createComponentService = async (db, params, user) => {
  let date = new Date();
  let resp = [];
  try {
    let appId = params.appId;
    const objectNames = await getObjectsByApp(db, appId);
    const objectData = await getObjectsByAppReturnData(db, appId);

    const allComps = getAllComps(objectNames);
    allComps.forEach(async page => {
      const bigName =
        page.name.charAt(0).toUpperCase() + page.name.substring(1);
      let codeRes = await createCodeObj(
        db,
        date,
        `All${bigName}.js`,
        "object actions",
        "components",
        page.code,
        `src/components/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    });

    let objData = [];
    for (var i = 0; i < objectData.length; i++) {
      const obj = objectData[i];
      const fields = await getFieldsByObj(db, obj.id);
      objData.push({
        name: obj.name,
        fields: fields
      });
    }
    const createComps = getCreateComps(objData);
    await createComps.forEach(async page => {
      const bigName =
        page.name.charAt(0).toUpperCase() + page.name.substring(1);
      let codeRes = await createCodeObj(
        db,
        date,
        `Create${bigName}.js`,
        "object actions",
        "actions",
        page.code,
        `src/components/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    });
    const editComps = getEditComps(objData);
    await editComps.forEach(async page => {
      const bigName =
        page.name.charAt(0).toUpperCase() + page.name.substring(1);
      let codeRes = await createCodeObj(
        db,
        date,
        `Edit${bigName}.js`,
        "object actions",
        "actions",
        page.code,
        `src/components/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    });
    const allViews = getViewComps(objectNames);
    allViews.forEach(async page => {
      const bigName =
        page.name.charAt(0).toUpperCase() + page.name.substring(1);
      let codeRes = await createCodeObj(
        db,
        date,
        `View${bigName}.js`,
        "object actions",
        "components",
        page.code,
        `src/components/${page.name}/`,
        appId,
        user
      );
      resp.push(codeRes);
    });
    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};

exports.createAppjsService = async (db, params, user) => {
  let date = new Date();
  let resp = [];
  try {
    let appId = params.appId;
    const objectNames = await getObjectsByApp(db, appId);
    const appData = await getAppById(db, appId);
    const appCode = getAppjs(appData.apiUrl, objectNames);
    let codeRes = await createCodeObj(
      db,
      date,
      `App.js`,
      "appjs",
      "appjs",
      appCode,
      `src/`,
      appId,
      user
    );
    resp.push(codeRes);
    return {
      status: 200,
      response: resp
    };
  } catch (err) {
    throw err;
  }
};

exports.deleteAllCodesByAppId = async (db, params, user) => {
  try {
    const appId = params.appId;
    let allCodes = await db
      .collection("code")
      .where("appId", "==", appId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    allCodes.forEach(async doc => {
      doc.ref.delete();
    })
    return { status: 200, response: { message: "codes deleted" } };
  } catch (err) {
    throw err;
  }
};
