const { db } = require("../util/admin");

exports.createObj = async (req, res) => {
  let date = new Date();
  const newObj = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    type: req.body.type,
    options: req.body.options,
    appId: req.body.appId,
    createdAt: date.toUTCString(),
    createdAtTimestamp: date.getTime()
  };
  try {
    let obj = await db.collection("obj").add(newObj);
    let resp = newObj;
    resp.id = obj.id;
    return res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
    console.error(err);
  }
};

exports.getObjs = async (req, res) => {
  let allObjs = await db
    .collection("obj")
    .orderBy("createdAtTimestamp", "desc")
    .get();
  let objs = [];
  allObjs.forEach(doc => {
    objs.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return res.json(objs);
};

exports.getObjsByApp = async (req, res) => {
  let allObjs = await db
    .collection("obj")
    .where("appId", "==", req.params.appId)
    .orderBy("createdAtTimestamp", "desc")
    .get();
  let objs = [];
  allObjs.forEach(doc => {
    objs.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return res.json(objs);
};

exports.getObjById = async (req, res) => {
  try {
    let obj = await db
      .collection("obj")
      .doc(req.params.objId)
      .get();
    if (!obj.exists) {
      return res.status(404).json({ error: "Obj not found" });
    }
    return res.json({ ...obj.data(), id: obj.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.editObj = async (req, res) => {
  let date = new Date();
  const editObj = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    type: req.body.type,
    options: req.body.options,
    appId: req.body.appId,
    updatedAt: date.toUTCString(),
    updatedAtTimestamp: date.getTime()
  };
  try {
    let obj = await db.doc(`/obj/${req.params.objId}`).get();
    if (!obj.exists) {
      return res.status(404).json({ error: "Obj not found" });
    }
    await obj.ref.update(editObj);
    return res.json(editObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.deleteObj = async (req, res) => {
  try {
    const obj = db.doc(`/obj/${req.params.objId}`);
    const doc = await obj.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Obj not found" });
    }
    console.info(doc.data());
    await obj.delete();
    return res.json({ message: "Obj deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
};
