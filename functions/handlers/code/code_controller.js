const { db } = require("../../util/admin");
const {
  createCodeService,
  getCodesService,
  getCodeByIdService,
  editCodeService,
  deleteCodeService,
  createCodeServiceService,
  createCodeControllerService,
  createCodeRouteService,
  getCodesByObjIdService,
  getCodesByAppIdService,
  createReducerService,
  createActionService,
  createPageRoutesService,
  createComponentService,
  createAppjsService,
  deleteAllCodesByAppId
} = require("./code_service");

exports.createCode = async (req, res) => {
  try {
    let resp = await createCodeService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "error on createCode", message: `${err}` });
  }
};

exports.getCodes = async (req, res) => {
  try {
    let resp = await getCodesService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "error on getCodes", message: `${err}` });
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
    return res
      .status(500)
      .json({ error: "error on getCodeById", message: `${err}` });
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
      .json({ error: "error on editCodeService", message: `${err}` });
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

exports.createCodeRoute = async (req, res) => {
  try {
    let resp = await createCodeRouteService(db, req.body, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createCodeRoute",
      message: `${err}`
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

exports.createReducerController = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createReducerService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createReducerController"
    });
  }
};

exports.deleteAllCodesByAppIdController = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await deleteAllCodesByAppId(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on deleteAllCodesByAppIdController"
    });
  }
};

exports.createActionController = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createActionService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createActionController"
    });
  }
};

exports.createPageRoutesController = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createPageRoutesService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createPageRoutesController"
    });
  }
};

exports.createComponentController = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createComponentService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createComponentController"
    });
  }
};

exports.createAppjsController = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp = await createAppjsService(db, params, req.user);
    return res.status(resp.status).json(resp.response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createAppjsController"
    });
  }
};

exports.createAllUIController = async (req, res) => {
  try {
    const params = {
      ...req.body,
      appId: req.params.appId
    };
    let resp1 = await createAppjsService(db, params, req.user);
    let resp2 = await createComponentService(db, params, req.user);
    let resp3 = await createPageRoutesService(db, params, req.user);
    let resp4 = await createActionService(db, params, req.user);
    let resp5 = await createReducerService(db, params, req.user);
    let resp = [];
    resp = resp.concat(
      resp1.response,
      resp2.response,
      resp3.response,
      resp4.response,
      resp5.response
    );
    return res.status(200).json(resp);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "error on createAllUIController",
      err: err
    });
  }
};