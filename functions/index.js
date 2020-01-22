const functions = require("firebase-functions");
const cors = require("cors");

const app = require("express")();

const FBAuth = require("./util/fbAuth");

const {
  signUp,
  login,
  getAuthenticatedUser,
  getUserDetails
} = require("./handlers/users");

const {
  createApp,
  getApps,
  getAppById,
  editApp,
  deleteApp
} = require("./handlers/app/app_controller");

const {
  createField,
  getFields,
  getFieldById,
  getFieldsByObj,
  editField,
  deleteField
} = require("./handlers/field");

const {
  createObj,
  getObjs,
  getObjById,
  getObjsByApp,
  editObj,
  deleteObj
} = require("./handlers/object");

const {
  createCode,
  getCodes,
  getCodeById,
  editCode,
  deleteCode,
  createCodeService,
  createCodeController,
  createCodeRoute,
  getCodesByObjId,
  getCodesByAppId,
  createReducerController,
  createActionController,
  createPageRoutesController,
  createComponentController,
  createAppjsController,
  deleteAllCodesByAppIdController,
  createAllUIController
} = require("./handlers/code/code_controller");
app.use(cors());

//App routes
//App
app.post("/app", FBAuth, createApp);
app.get("/app", FBAuth, getApps);
app.get("/app/:appId", FBAuth, getAppById);
app.put("/app/:appId", FBAuth, editApp);
app.delete("/app/:appId", FBAuth, deleteApp);
//Workflow
//Data
//Object
app.post("/obj", FBAuth, createObj);
app.get("/obj", FBAuth, getObjs);
app.get("/obj/:objId", FBAuth, getObjById);
app.get("/app/:appId/obj", FBAuth, getObjsByApp);
app.put("/obj/:objId", FBAuth, editObj);
app.delete("/obj/:objId", FBAuth, deleteObj);

//Fields
app.post("/field", FBAuth, createField);
app.get("/field", FBAuth, getFields);
app.get("/field/:fieldId", FBAuth, getFieldById);
app.get("/obj/:objId/field", FBAuth, getFieldsByObj);
app.put("/field/:fieldId", FBAuth, editField);
app.delete("/field/:fieldId", FBAuth, deleteField);

//Code
app.post("/code", FBAuth, createCode);
app.get("/code", FBAuth, getCodes);
app.get("/code/:codeId", FBAuth, getCodeById);
app.post("/code/service", FBAuth, createCodeService);
app.post("/code/controller", FBAuth, createCodeController);
app.post("/code/route", FBAuth, createCodeRoute);
app.post("/app/:appId/code/ui/reducer", FBAuth, createReducerController);
app.post("/app/:appId/code/ui/actions", FBAuth, createActionController);
app.post("/app/:appId/code/ui/routepages", FBAuth, createPageRoutesController);
app.post("/app/:appId/code/ui/comps", FBAuth, createComponentController);
app.post("/app/:appId/code/ui/appjs", FBAuth, createAppjsController);
app.post("/app/:appId/code/ui/all", FBAuth, createAllUIController);
app.delete("/app/:appId/code", FBAuth, deleteAllCodesByAppIdController);
app.get("/obj/:objId/code", FBAuth, getCodesByObjId);
app.get("/app/:appId/code", FBAuth, getCodesByAppId);
app.put("/code/:codeId", FBAuth, editCode);
app.delete("/code/:codeId", FBAuth, deleteCode);
//Form
//Rules
//Roles

//User routes
app.post("/signup", signUp);
app.post("/login", login);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:username", getUserDetails);

exports.api = functions.https.onRequest(app);
