exports.functionStr = (bigName, smallName) => {return (`const { db } = require("../util/admin");

exports.create${bigName} = async (req, res) => {
  let date = new Date();
  const new${bigName} = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    createdAt: date.toUTCString(),
    createdAtTimestamp: date.getTime()
  };
  try {
    let ${smallName} = await db.collection("${smallName}").add(new${bigName});
    let resp = new${bigName};
    resp.id = ${smallName}.id;
    return res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
    console.error(err);
  }
};

exports.get${bigName}s = async (req, res) => {
  let all${bigName}s = await db
    .collection("${smallName}")
    .orderBy("createdAtTimestamp", "desc")
    .get();
  let ${smallName}s = [];
  all${bigName}s.forEach(doc => {
    ${smallName}s.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return res.json(${smallName}s);
};

exports.get${bigName}ById = async (req, res) => {
  try {
    let ${smallName} = await db
      .collection("${smallName}")
      .doc(req.params.${smallName}Id)
      .get();
    if (!${smallName}.exists) {
      return res.status(404).json({ error: "${bigName} not found" });
    }
    return res.json(${smallName}.data());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.edit${bigName} = async (req, res) => {
  let date = new Date();
  const edit${bigName} = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    updatedAt: date.toUTCString(),
    updatedAtTimestamp: date.getTime()
  };
  try {
    let ${smallName} = await db.doc(\`/${smallName}/\${req.params.${smallName}Id}\`).get();
    if (!${smallName}.exists) {
      return res.status(404).json({ error: "${bigName} not found" });
    }
    await ${smallName}.ref.update(edit${bigName});
    return res.json(edit${bigName});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.delete${bigName} = async (req, res) => {
  try {
    const ${smallName} = db.doc(\`/${smallName}/\${req.params.${smallName}Id}\`);
    const doc = await ${smallName}.get();
    if (!doc.exists) {
      return res.status(404).json({ error: "${bigName} not found" });
    }
    console.info(doc.data());
    await ${smallName}.delete();
    return res.json({ message: "${bigName} deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.code });
  }
};`)};

exports.functionTestStr = (bigName, smallName, apiUrl, username, password) => {return (`test`);}