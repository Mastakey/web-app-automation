const {
  generateService,
  generateServiceTests
} = require("../service");

function testService() {
  let fields = ["type", "code", "objId", "appId"];
  let code = generateService("Code", "code", fields);
  console.log(code);
}

function testServiceTest() {
  let fields = ["type", "code", "objId", "appId"];
  let databaseURL = "http://test";
  let code = generateServiceTests("Code", "code", fields, databaseURL);
  console.log(code);
}

//run();
//testService();
testServiceTest();
