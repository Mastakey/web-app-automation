const { db } = require("../util/admin");

exports.createField = async (req, res) => {
  let date = new Date();
  const newField = {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    options: req.body.options,
    objId: req.body.objId,
    username: req.user.username,
    createdAt: date.toUTCString(),
    createdAtTimestamp: date.getTime()
  };
  try {
    let field = await db.collection("field").add(newField);
    let resp = newField;
    resp.id = field.id;
    return res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
    console.error(err);
  }
};

exports.getFields = async (req, res) => {
  let allFields = await db
    .collection("field")
    .orderBy("createdAtTimestamp", "desc")
    .get();
  let fields = [];
  allFields.forEach(doc => {
    fields.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return res.json(fields);
};

exports.getFieldsByObj = async (req, res) => {
  let allFields = await db
    .collection("field")
    .where("objId", "==", req.params.objId)
    .orderBy("createdAtTimestamp", "desc")
    .get();
  let fields = [];
  allFields.forEach(doc => {
    fields.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return res.json(fields);
};

exports.getFieldById = async (req, res) => {
  try {
    let field = await db
      .collection("field")
      .doc(req.params.fieldId)
      .get();
    if (!field.exists) {
      return res.status(404).json({ error: "Field not found" });
    }
    return res.json(field.data());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.editField = async (req, res) => {
  let date = new Date();
  const editField = {
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    options: req.body.options,
    objId: req.body.objId,
    username: req.user.username,
    updatedAt: date.toUTCString(),
    updatedAtTimestamp: date.getTime()
  };
  try {
    let field = await db.doc(`/field/${req.params.fieldId}`).get();
    if (!field.exists) {
      return res.status(404).json({ error: "Field not found" });
    }
    await field.ref.update(editField);
    return res.json(editField);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.deleteField = async (req, res) => {
  try {
    const field = db.doc(`/field/${req.params.fieldId}`);
    const doc = await field.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Field not found" });
    }
    console.info(doc.data());
    await field.delete();
    return res.json({ message: "Field deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
};
