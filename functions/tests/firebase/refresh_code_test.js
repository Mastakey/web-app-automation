var admin = require("firebase-admin");

var serviceAccount = require("../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-app-automation-f9ad3.firebaseio.com"
});
const db = admin.firestore();

const { generateFunctions } = require("../../util/codegen_func");

let getApp = async appId => {
  try {
    let app = await db
      .collection("app")
      .doc(appId)
      .get();
    if (!app.exists) {
      console.log("App not found");
      return [];
    }
    return {...app.data(), id: app.id };
  } catch (err) {
    console.error(err);
  }
};

let getObjsByApp = async appId => {
  try {
    let allObjs = await db
      .collection("obj")
      .where("appId", "==", appId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    return allObjs;
  } catch (err) {
    console.log(err);
  }
};

let getCodesbyObj = async objId => {
  try {
    let allCode = await db
      .collection("code")
      .where("objId", "==", objId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    return allCode;
  } catch (err) {
    console.log(err);
  }
};

let getFieldsByObj = async objId => {
  try {
    let allFields = await db
      .collection("field")
      .where("objId", "==", objId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let fields = [];
    allFields.forEach(doc => {
      let fieldData = doc.data();
      fields.push(fieldData.name);
    });
    return fields;
  } catch (err) {
    console.log(err);
  }
};

let refreshCodeByObj = async (objId, objData) => {
  try {
    let codes = await getCodesbyObj(objId);
    codes.forEach(async code => {
      const id = code.id;
      const data = code.data();
      const type = data.type;
      const smallName = objData.name;
      const bigName =
        smallName.charAt(0).toUpperCase() + smallName.substring(1);
      const fields = await getFieldsByObj(objId);
      console.log(fields);
      let codeStr = "";
      if (type === "functions") {
        codeStr = generateFunctions(bigName, smallName, fields);
      }
      let codeRef = await db.doc(`/code/${id}`).get();
      if (!code.exists) {
        console.log("Code not found");
        return;
      }
      if (codeStr !== "") {
        const newCode = { code: codeStr };
        await codeRef.ref.update(newCode);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

let run = async function() {
  let appId = "1mOfAE0RRpn356OU5pmg";
  let app = await getApp(appId);
  console.log(app);
  let objs = await getObjsByApp(appId);
  objs.forEach(async obj => {
    const objData = obj.data();
    const objId = obj.id;
    refreshCodeByObj(objId, objData);
  });
};

let getObjRun = async function(){
    let appId = "1mOfAE0RRpn356OU5pmg";
    let app = await getApp(appId);
    console.log(app);
}

//run();
getObjRun();
