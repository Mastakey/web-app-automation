const { db } = require("../util/admin");
const { generateNavBar } = require("../util/codegen_ui");
const { generateFunctions } = require("../util/codegen/backend/functions");
const { generateTests } = require("../util/codegen/backend/tests");

exports.createCode = async (req, res) => {
  let date = new Date();
  const newCode = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    type: req.body.type,
    code: req.body.code,
    appId: req.body.appId,
    objId: req.body.objId,
    createdAt: date.toUTCString(),
    createdAtTimestamp: date.getTime()
  };
  try {
    let code = await db.collection("code").add(newCode);
    let resp = newCode;
    resp.id = code.id;
    return res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
    console.error(err);
  }
};

exports.createCodeFunctions = async (req, res) => {
  let date = new Date();
  let code = "";
  let objId = req.body.objId;
  let appId = req.body.appId;
  try {
    let obj = await db
      .collection("obj")
      .doc(objId)
      .get();
    if (!obj.exists) {
      return res.status(404).json({ error: "Obj not found" });
    }
    const objData = obj.data();
    const smallName = objData.name;
    const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
    if (appId === "" || appId === null) {
      appId = objData.appId;
    }
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
    code = generateFunctions(bigName, smallName, fields);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
  const newCode = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    type: req.body.type,
    code: code,
    appId: appId,
    objId: req.body.objId,
    createdAt: date.toUTCString(),
    createdAtTimestamp: date.getTime()
  };
  try {
    let code = await db.collection("code").add(newCode);
    let resp = newCode;
    resp.id = code.id;
    return res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
    console.error(err);
  }
};

exports.createCode2 = async (req, res) => {
  let date = new Date();
  let code = "";
  let objId = req.body.objId;
  let appId = req.body.appId;
  if (req.body.type === "NavBar") {
    code = generateNavBar();
  } else if (objId && objId !== "" && req.body.type === "functions") {
    try {
      let obj = await db
        .collection("obj")
        .doc(objId)
        .get();
      if (!obj.exists) {
        return res.status(404).json({ error: "Obj not found" });
      }
      const objData = obj.data();
      const smallName = objData.name;
      const bigName =
        smallName.charAt(0).toUpperCase() + smallName.substring(1);
      if (appId === "" || appId === null) {
        appId = objData.appId;
      }
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
      code = generateFunctions(bigName, smallName, fields);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  } else if (req.body.type === "tests") {
  }
  const newCode = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    type: req.body.type,
    code: code,
    appId: appId,
    objId: req.body.objId,
    createdAt: date.toUTCString(),
    createdAtTimestamp: date.getTime()
  };
  try {
    let code = await db.collection("code").add(newCode);
    let resp = newCode;
    resp.id = code.id;
    return res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
    console.error(err);
  }
};

exports.createCodeTests = async (req, res) => {
  let date = new Date();
  let code = "";
  let objId = req.body.objId;
  let appId = req.body.appId;
  let apiUrl = req.body.apiUrl;
  try {
    let obj = await db
      .collection("obj")
      .doc(objId)
      .get();
    if (!obj.exists) {
      return res.status(404).json({ error: "Obj not found" });
    }
    const objData = obj.data();
    const smallName = objData.name;
    const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
    if (appId === "" || appId === null) {
      appId = objData.appId;
    }
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
    code = generateTests(
      bigName,
      smallName,
      apiUrl,
      'user5@email.com',
      '123456',
      testData
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
  const newCode = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    type: "tests",
    code: code,
    appId: appId,
    objId: req.body.objId,
    createdAt: date.toUTCString(),
    createdAtTimestamp: date.getTime()
  };
  try {
    let code = await db.collection("code").add(newCode);
    let resp = newCode;
    resp.id = code.id;
    return res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
    console.error(err);
  }
};

exports.createCodeService = async (req, res) => {
  
}

exports.getCodeByApp = async (req, res) => {
  let allCode = await db
    .collection("code")
    .where("appId", "==", req.params.appId)
    .orderBy("createdAtTimestamp", "desc")
    .get();
  let code = [];
  allCode.forEach(doc => {
    code.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return res.json(code);
};

exports.editCode = async (req, res) => {
  let date = new Date();
  let codeStr = "";
  let objId = req.body.objId;
  let appId = req.body.appId;

  if (req.body.type === "NavBar") {
    codeStr = generateNavBar();
  } else if (objId && objId !== "" && req.body.type === "functions") {
    try {
      let obj = await db
        .collection("obj")
        .doc(objId)
        .get();
      if (!obj.exists) {
        return res.status(404).json({ error: "Obj not found" });
      }
      const objData = obj.data();
      const smallName = objData.name;
      const bigName =
        smallName.charAt(0).toUpperCase() + smallName.substring(1);
      if (appId === "" || appId === null) {
        appId = objData.appId;
      }
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
      codeStr = generateFunctions(bigName, smallName, fields);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "something went wrong" });
    }
  } else if (req.body.type === "tests") {
  }
  const editCode = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    type: req.body.type,
    code: codeStr,
    appId: appId,
    objId: objId,
    updatedAt: date.toUTCString(),
    updatedAtTimestamp: date.getTime()
  };
  try {
    let code = await db.doc(`/code/${req.params.codeId}`).get();
    if (!code.exists) {
      return res.status(404).json({ error: "Code not found" });
    }
    await code.ref.update(editCode);
    return res.json(editCode);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.getCodeByObj = async (req, res) => {
  let allCode = await db
    .collection("code")
    .where("objId", "==", req.params.objId)
    .orderBy("createdAtTimestamp", "desc")
    .get();
  let code = [];
  allCode.forEach(doc => {
    code.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return res.json(code);
};

exports.deleteCode = async (req, res) => {
  try {
    const code = db.doc(`/code/${req.params.codeId}`);
    const doc = await code.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Code not found" });
    }
    console.info(doc.data());
    await code.delete();
    return res.json({ id: doc.id, message: "Code deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
};
