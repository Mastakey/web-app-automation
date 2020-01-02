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
} = require("./handlers/app");

const {
  createField,
  getFields,
  getFieldById,
  getFieldsByApp,
  editField,
  deleteField
} = require("./handlers/field");

const { createCode, getCodeByApp } = require("./handlers/code");

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

//Fields
app.post("/field", FBAuth, createField);
app.get("/field", FBAuth, getFields);
app.get("/field/:fieldId", FBAuth, getFieldById);
app.get("/app/:appId/field", FBAuth, getFieldsByApp);
app.put("/field/:fieldId", FBAuth, editField);
app.delete("/field/:fieldId", FBAuth, deleteField);

//Code
app.post("/code", FBAuth, createCode);
app.get("/app/:appId/code", FBAuth, getCodeByApp);
//Form
//Rules
//Roles

//User routes
app.post("/signup", signUp);
app.post("/login", login);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:username", getUserDetails);

exports.api = functions.https.onRequest(app);
