const { generateNavBar, generateFunctions } = require("../util/codegen");

function run(){
    let code = generateNavBar();
    let functions = generateFunctions("Obj", "obj");
    //console.log(code);
    console.log(functions);
}

run();