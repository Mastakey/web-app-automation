const { db } = require("../../util/admin");
const {
  createAppService,
  getAppsService,
  getAppByIdService,
  editAppService,
  deleteAppService
} = require("./app_service");

exports.createApp = async (req, res) => {
  try {
    let resp = await createAppService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on createApp" });
  }
};

exports.getApps = async (req, res) => {
  try {
    let resp = await getAppsService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on getApps" });
  }
};

exports.getAppById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await getAppByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on getAppById" });
  }
};

exports.editApp = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await editAppService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on editAppService", message: err });
  }
};

exports.deleteApp = async (req, res) => {
  const params = {
    appId: req.params.appId
  };
  try {
    let resp = await deleteAppService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on editAppService" });
  }
};
