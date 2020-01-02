const { db } = require("../util/admin");

exports.createApp = async (req, res) => {
  let date = new Date();
  const newApp = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    createdAt: date.toUTCString(),
    createdAtTimestamp: date.getTime()
  };
  try {
    let app = await db.collection("app").add(newApp);
    let resp = newApp;
    resp.id = app.id;
    return res.status(200).json(resp);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
    console.error(err);
  }
};

exports.getApps = async (req, res) => {
  let allApps = await db
    .collection("app")
    .orderBy("createdAtTimestamp", "desc")
    .get();
  let apps = [];
  allApps.forEach(doc => {
    apps.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return res.json(apps);
};

exports.getAppById = async (req, res) => {
  try {
    let app = await db
      .collection("app")
      .doc(req.params.appId)
      .get();
    if (!app.exists) {
      return res.status(404).json({ error: "App not found" });
    }
    return res.json(app.data());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

exports.editApp = async (req, res) => {
  let date = new Date();
  const editApp = {
    name: req.body.name,
    description: req.body.description,
    username: req.user.username,
    updatedAt: date.toUTCString(),
    updatedAtTimestamp: date.getTime()
  };
  try {
    let app = await db.doc(`/app/${req.params.appId}`).get();
    if (!app.exists) {
      return res.status(404).json({ error: "App not found" });
    }
    await app.ref.update(editApp);
    return res.json(editApp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "something went wrong" });
  }
};

exports.deleteApp = async (req, res) => {
  try {
    const app = db.doc(`/app/${req.params.appId}`);
    const doc = await app.get();
    if (!doc.exists){
        return res.status(404).json({error: 'App not found'});
    }
    console.info(doc.data());
    await app.delete();
    return res.json({message: 'App deleted'});
  } catch(err){
      console.error(err);
      return res.status(500).json({error: err.code});
  }
};
