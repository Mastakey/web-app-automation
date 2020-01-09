exports.getFieldsByObj = async (db, objId) => {
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
};

exports.getObjectsByApp = async (db, appId) => {
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
};