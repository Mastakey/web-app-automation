var admin = require("firebase-admin");

var serviceAccount = require("./web-app-automation-creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://web-app-automation-f9ad3.firebaseio.com"
});
const db = admin.firestore();

const {
  generateTests,
  generateTestData
} = require("../../util/codegen/backend/tests");

let getTests = async params => {
  //params
  let objId = params.objId;
  let appId = params.appId;
  let apiUrl = params.apiUrl;
  let name = params.name;
  let description = params.description;

  let date = new Date();
  let code = "";
  try {
    let obj = await db
      .collection("obj")
      .doc(objId)
      .get();
    if (!obj.exists) {
      //return res.status(404).json({ error: "Obj not found" });
      console.log("Object not found");
      return;
    }
    console.log("object:");
    console.log(obj.data());
    const objData = obj.data();
    const smallName = objData.name;
    const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
    if (appId === "" || appId === undefined || appId === null) {
      appId = objData.appId;
    }
    console.log("appId:");
    console.log(appId);
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
    console.log("fields:");
    console.log(fields);
    let fieldValues = {};
    fields.forEach(field => {
      fieldValues[field] = field + " sample value";
    });
    //let testData = generateTestData(name, description, fields, fieldValues);
    //console.log("test data:");
    //console.log(testData);
    let testData = {
      createTestData: {
        name: "new Todo item",
        description: "just a new todo item"
      },
      editTestData: {
        name: "new Todo item",
        description: "just a new todo item that was edited"
      }
    };
    code = generateTests(
      bigName,
      smallName,
      apiUrl,
      "user5@email.com",
      "123456",
      testData
    );
    console.log("code:");
    console.log(code);
  } catch (err) {
    console.log(err);
  }
};

let runGetTests = async () => {
  console.log("Run Tests");
  let params = {
    objId: "2oGek9MGw0c4d3B2Cezo",
    apiUrl: "https://us-central1-todo-6d12f.cloudfunctions.net/api",
    name: "tests",
    description: "tests"
  };
  await getTests(params);
};

runGetTests();
