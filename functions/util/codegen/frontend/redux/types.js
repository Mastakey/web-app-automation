exports.getTypes = objects => {
  let code = "";
  objects.forEach(object => {
    code += getObjectTypes(object);
    code += "\n\n";
  });
  return code;
};

let getObjectTypes = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  const upperName = smallName.toUpperCase();
  return `// ${bigName} reducers
export const CREATE_${upperName} = "CREATE_${upperName}";
export const READ_${upperName}_ALL = "READ_${upperName}_ALL";
export const READ_${upperName} = "READ_${upperName}";
export const UPDATE_${upperName} = "UPDATE_${upperName}";
export const DELETE_${upperName} = "DELETE_${upperName}";
export const WRITE_LOADING_${upperName} = "WRITE_LOADING_${upperName}";
export const READ_LOADING_${upperName} = "READ_LOADING_${upperName}";
export const SET_${upperName}_ERROR = "SET_${upperName}_ERROR";`;
};

//let code = getTypes(["todo", "project"]);
//console.log(code);
