const {
  generateController,
  generateControllerTests
} = require("../controller");

function testController() {
  let code = generateController("Code", "code");
  console.log(code);
}

function testControllerTest() {
  let fields = ["type", "code", "objId", "appId"];
  let apiUrl =
    "https://us-central1-web-app-automation-f9ad3.cloudfunctions.net/api";
  let code = generateControllerTests("Code", "code", fields, apiUrl);
  console.log(code);
}

//testController();
testControllerTest();
