const { getFieldParams } = require("./util");

exports.generateService = (bigName, smallName, fields) => {
  const fieldParams = getFieldParams(fields, {
    prefix: "params.",
    tabLevel: 2,
    generateValues: false
  });
  return `const { validateName } = require("./todo_validators");
  
  exports.create${bigName}Service = async (db, params, user) => {
  try {
    let date = new Date();
    const new${bigName} = {
      name: params.name,
      description: params.description,
      username: user.username,
      ${fieldParams},
      createdAt: date.toUTCString(),
      createdAtTimestamp: date.getTime()
    };
    //validation
    let validationErrors = [];
    //Name
    const nameValidation = validateName(params.name);
    if (!nameValidation.valid) {
      validationErrors.push(nameValidation);
    }
    //Throw Error
    if (validationErrors.length > 0) {
      throw { error: validationErrors, function: "createTodoService" };
    }
    let ${smallName} = await db.collection("${smallName}").add(new${bigName});
    let resp = new${bigName};
    resp.id = ${smallName}.id;
    return { status: 200, response: resp };
  } catch (err) {
    err.function = "create${bigName}Service";
    throw err;
  }
};

exports.get${bigName}sService = async (db, params, user) => {
  try {
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
    return { status: 200, response: ${smallName}s };
  } catch (err) {
    err.function = "get${bigName}sService";
    throw err;
  }
};

exports.get${bigName}ByIdService = async (db, params, user) => {
  try {
    let ${smallName} = await db
      .collection("${smallName}")
      .doc(params.${smallName}Id)
      .get();
    if (!${smallName}.exists) {
      return { status: 404, response: { error: "${smallName} not found" } };
    }
    return { status: 200, response: { ...${smallName}.data(), id: ${smallName}.id } };
  } catch (err) {
    err.function = "get${bigName}ByIdService";
    throw err;
  }
};

exports.edit${bigName}Service = async (db, params, user) => {
  try {
    let date = new Date();
    const edit${bigName} = {
      name: params.name,
      description: params.description,
      username: user.username,
      ${fieldParams},
      updatedAt: date.toUTCString(),
      updatedAtTimestamp: date.getTime()
    };
    //validation
    let validationErrors = [];
    //Name
    const nameValidation = validateName(params.name);
    if (!nameValidation.valid) {
      validationErrors.push(nameValidation);
    }
    //Throw Error
    if (validationErrors.length > 0) {
      throw { error: validationErrors, function: "createTodoService" };
    }
  
    let ${smallName} = await db.doc(\`/${smallName}/\${params.${smallName}Id}\`).get();
    if (!${smallName}.exists) {
      return { status: 404, response: { error: "${smallName} not found" } };
    }
    await ${smallName}.ref.update(edit${bigName});
    return { status: 200, response: edit${bigName} };
  } catch (err) {
    err.function = "edit${bigName}Service";
    throw err;
  }
};

exports.delete${bigName}Service = async (db, params, user) => {
  try {
    const ${smallName} = db.doc(\`/${smallName}/\${params.${smallName}Id}\`);
    const doc = await ${smallName}.get();
    if (!doc.exists) {
      return { status: 404, response: { error: "${smallName} not found" } };
    }
    await ${smallName}.delete();
    return { status: 200, response: { id: doc.id, message: "${smallName} deleted" } };
  } catch (err) {
    err.function = "delete${bigName}Service";
    throw err;
  }
};`;
};

exports.generateServiceTests = (bigName, smallName, fields, databaseURL) => {
  const fieldParams = getFieldParams(fields, {
    prefix: "",
    tabLevel: 2,
    generateValues: true
  });
  return `var admin = require("firebase-admin");

var serviceAccount = require("../../../util/creds.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "${databaseURL}"
});
const db = admin.firestore();

const {
  create${bigName}Service,
  get${bigName}sService,
  get${bigName}ByIdService,
  edit${bigName}Service,
  delete${bigName}Service
} = require("../${smallName}_service");

let create${bigName}Test = async () => {
  const params = {
    name: "test ${smallName}",
    description: "test ${smallName} desc",
    ${fieldParams}
  };
  const user = {
    username: "user5"
  };
  try {
    let resp = await create${bigName}Service(db, params, user);
    console.log(resp);
    return resp.response.id;
  } catch (err) {
    console.log(err);
  }
};

let get${bigName}sTest = async () => {
  try {
    const params = {
    };
    const user = {
      username: "user5"
    };
    let resp = await get${bigName}sService(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let get${bigName}ByIdTest = async ${smallName}Id => {
  try {
    const params = {
      ${smallName}Id: ${smallName}Id
    };
    let resp = await get${bigName}ByIdService(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let edit${bigName}Test = async ${smallName}Id => {
  const params = {
    name: "test ${smallName} edited",
    description: "test ${smallName} desc edited",
    ${smallName}Id: ${smallName}Id,
    ${fieldParams}
  };
  try {
    const user = {
      username: "user5"
    };
    let resp = await edit${bigName}Service(db, params, user);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let delete${bigName}Test = async ${smallName}Id => {
  const params = {
    ${smallName}Id: ${smallName}Id
  };
  try {
    let resp = await delete${bigName}Service(db, params);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};

let run = async () => {
  console.log("Create ${bigName}");
  let ${smallName}Id = await create${bigName}Test();
  console.log("Get ${bigName}s");
  await get${bigName}sTest();
  console.log("Get ${bigName} by Id");
  await get${bigName}ByIdTest(${smallName}Id);
  console.log("Edit ${bigName}");
  await edit${bigName}Test(${smallName}Id);
  console.log("Delete ${bigName}");
  await delete${bigName}Test(${smallName}Id);
};

run();
`;
};
