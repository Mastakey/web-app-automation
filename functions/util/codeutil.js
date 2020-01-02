const headerMapping = {
  react: 'import React, { Component, Fragment } from "react";\n',
  proptypes: 'import PropTypes from "prop-types";\n',
  connect: 'import { connect } from "react-redux";\n'
};

const muiMapping = {
  withStyles: 'import withStyles from "@material-ui/core/styles/withStyles";\n'
};

exports.generateHeaders = headers => {
  let code = "";
  headers.forEach(element => {
    code += headerMapping[element];
  });
  return code;
};

exports.generateMuiHeaders = (muiElements, muiIcons) => {
  let code = "";
  code += muiMapping.withStyles;
  muiElements.forEach(element => {
    code += `import ${element} from "@material-ui/core/${element}";\n`;
  });
  muiIcons.forEach(element => {
    code += `import ${element}Icon from "@material-ui/icons/${element}";\n`;
  });
  return code;
};

exports.generateStyles = (styles) => {
    return "const styles = " + stringify(styles)+"\n";
}

exports.generateComponent = (name, props, jsxString) => {
    let code = "";
    code += `class ${name} extends Component {\n`
    code += 'render(){\n';
    props.forEach(element => {
        code += `const ${element} = this.props.${element}\n`;
    })
    code += 'return(\n';
    code += jsxString;
    code += ')\n';
    code += '}\n';
    code += '}\n';
    return code;
}

exports.generatePostCode = (name, propTypes, stateToProps, reduxFunctions) => {
    let code = "";
    code += `${name}.propTypes = {\n`;
    propTypes.forEach(element => {
        code += `${element.name}: PropTypes.${element.type}.isRequired,\n`
    });
    code += '}\n'
    code += 'const mapStateToProps = state => ({\n'
    stateToProps.forEach(element => {
        code += `${element.name}: state.${element.value},\n`;
    });
    code += '});\n';
    code += `export default connect(mapStateToProps, {})(withStyles(styles)(${name}));`;
    return code;
}

function stringify(obj_from_json) {
  if (typeof obj_from_json !== "object" || Array.isArray(obj_from_json)) {
    // not an object, stringify using native function
    return JSON.stringify(obj_from_json);
  }
  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  let props = Object.keys(obj_from_json)
    .map(key => `${key}:${stringify(obj_from_json[key])}`)
    .join(",");
  return `{${props}}`;
}
