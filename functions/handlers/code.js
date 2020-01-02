const { db } = require("../util/admin");
const { generateNavBar } = require("../util/codegen");

exports.createCode = async (req, res) => {
  let date = new Date();
  let code = "";
  if (req.body.type === 'NavBar'){
    code = generateNavBar();
  }
  const newCode = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    type: req.body.type,
    code: code,
    appId: req.body.appId,
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
