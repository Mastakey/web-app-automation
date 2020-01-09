const { db } = require("../../util/admin");
const {
  createCodeService,
  getCodesService,
  getCodeByIdService,
  editCodeService,
  deleteCodeService,
  createCodeServiceService,
  createCodeControllerService,
  getCodesByObjIdService,
  getCodesByAppIdService
} = require("./code_service");

exports.createCode = async (req, res) => {
  try {
    let resp = await createCodeService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on createCode" });
  }
};

exports.getCodes = async (req, res) => {
  try {
    let resp = await getCodesService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on getCodes" });
  }
};

exports.getCodeById = async (req, res) => {
  try {
    const params = {
      ...req.body,
      codeId: req.params.codeId
    };
    let resp = await getCodeByIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on getCodeById" });
  }
};

exports.editCode = async (req, res) => {
  try {
    const params = {
      ...req.body,
      codeId: req.params.codeId
    };
    let resp = await editCodeService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "error on editCodeService", message: err });
  }
};

exports.deleteCode = async (req, res) => {
  const params = {
    codeId: req.params.codeId
  };
  try {
    let resp = await deleteCodeService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on editCodeService" });
  }
};

exports.createCodeService = async (req, res) => {
  try {
    let resp = await createCodeServiceService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "error on createCodeService" });
  }
};

exports.createCodeController = async (req, res) => {
  try {
    let resp = await createCodeControllerService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodeController"
    });
  }
};

exports.getCodesByObjId = async (req, res) => {
  try {
    const params = {
      ...req.body,
      objId: req.params.objId
    };
    let resp = await getCodesByObjIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on getCodesByObjId"
    });
  }
};

exports.getCodesByAppId = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await getCodesByAppIdService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on getCodesByAppId"
    });
  }
};
