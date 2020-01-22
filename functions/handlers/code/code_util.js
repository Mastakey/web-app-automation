exports.getFieldsByObj = async (db, objId) => {
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
    console.error("error on getFieldsByObj");
    console.error(err);
    throw err;
  }
};

exports.getAppById = async (db, id) => {
  try {
    let app = await db
      .collection("app")
      .doc(id)
      .get();
    return app.data();
  } catch (err) {
    throw err;
  }
};

exports.getObjectsByApp = async (db, appId) => {
  try {
    let allObjs = await db
      .collection("obj")
      .where("appId", "==", appId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let objects = [];
    allObjs.forEach(doc => {
      let fieldData = doc.data();
      objects.push(fieldData.name);
    });
    return objects;
  } catch (err) {
    console.error("error on getObjectsByApp");
    console.error(err);
    throw err;
  }
};

exports.getObjectsByAppReturnData = async (db, appId) => {
  try {
    let allObjs = await db
      .collection("obj")
      .where("appId", "==", appId)
      .orderBy("createdAtTimestamp", "desc")
      .get();
    let objects = [];
    allObjs.forEach(doc => {
      let fieldData = doc.data();
      fieldData.id = doc.id;
      objects.push(fieldData);
    });
    return objects;
  } catch (err) {
    console.error("error on getObjectsByAppReturnData");
    console.error(err);
    throw err;
  }
};

exports.createCodeObj = async (
  db,
  date,
  name,
  desc,
  type,
  code,
  folder,
  appId,
  user
) => {
  const codeObj = {
    name: name,
    description: desc,
    username: user.username,
    type: type,
    code: code,
    folder: folder,
    appId: appId,
    objId: "",
    createdAt: date.toUTCString(),
    createdAtTimestamp: date.getTime()
  };

  let doc = await db.collection("code").add(codeObj);
  let codeRes = codeObj;
  codeRes.id = doc.id;
  return codeRes;
};
