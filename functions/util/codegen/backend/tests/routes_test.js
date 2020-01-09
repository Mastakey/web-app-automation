const { generateRoutes } = require("../routes");

function testRoutes() {
  let code = generateRoutes(["app", "code"], {});
  console.log(code);
}

testRoutes();
