const {
  generateHeaders,
  generateMuiHeaders,
  generateStyles,
  generateComponent,
  generatePostCode
} = require("./codeutil");

const {
  functionStr
} = require("./codegen_func");

exports.generateNavBar = () => {
  let code = "";
  code += generateHeaders(["react", "proptypes", "connect"]);
  code += "\n// Material UI Components\n";
  code += generateMuiHeaders(["AppBar", "Toolbar", "Button"], []);
  code += "\n";
  code += generateStyles({
    root: {
      flexGrow: 1
    },
    home: {
      flexGrow: 1,
      justifyContent: "flex-start"
    }
  });
  let jsx = 
`<div className={classes.root}>
<AppBar position="static">
    <Toolbar className="nav-container">
    <div className={classes.home}>
        <Button color="inherit">home</Button>
    </div>
    </Toolbar>
</AppBar>
</div>`;
  code += generateComponent("NavBar", ["classes"], jsx);
  code += generatePostCode(
    "NavBar",
    [{ name: "authenticated", type: "bool" }],
    [{ name: "authenticated", value: "user.authenticated" }],
    ""
  );
  return code;
};

exports.login = () => {};

exports.home = () => {};

exports.reducers = () => {};

exports.actions = () => {};

exports.generateFunctions = (bigName, smallName) => {
  return functionStr(bigName, smallName);
};
