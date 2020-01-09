exports.generateRoutes = (objects, options) => {
  const headersStr = getHeadersStr(objects);
  const routesStr = getRoutesStr(objects);
  return `const functions = require("firebase-functions");
const cors = require("cors");
const app = require("express")();
const FBAuth = require("./util/fbAuth");
app.use(cors());

const {
  signUp,
  login,
  getAuthenticatedUser,
  getUserDetails
} = require("./handlers/users");

${headersStr}
//User routes
app.post("/signup", signUp);
app.post("/login", login);
app.get("/user", FBAuth, getAuthenticatedUser);
app.get("/user/:username", getUserDetails);

${routesStr}
exports.api = functions.https.onRequest(app);`;
};

let getHeadersStr = objects => {
  let headerStr = "";
  objects.forEach(object => {
    headerStr += getHeaderStr(object);
  });
  return headerStr;
};

let getHeaderStr = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  return `const {
  create${bigName},
  get${bigName}s,
  get${bigName}ById,
  edit${bigName},
  delete${bigName}
} = require("./handlers/${smallName}/${smallName}_controller");

`;
};

let getRoutesStr = objects => {
    let routeStr = "";
    objects.forEach(object => {
      routeStr += getRouteStr(object);
    });
    return routeStr;
}

let getRouteStr = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  return `//${bigName} routes
app.post("/${smallName}", FBAuth, create${bigName});
app.get("/${smallName}", FBAuth, get${bigName}s);
app.get("/${smallName}/:${smallName}Id", FBAuth, get${bigName}ById);
app.put("/${smallName}/:${smallName}Id", FBAuth, edit${bigName});
app.delete("/${smallName}/:${smallName}Id", FBAuth, delete${bigName});
  
`;
};
