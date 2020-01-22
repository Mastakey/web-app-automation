exports.getActions = objects => {
  let actions = [];
  objects.forEach(object => {
    let code = {};
    code.name = object;
    code.code = getAction(object);
    actions.push(code);
  });
  return actions;
};

let getAction = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  const upperName = smallName.toUpperCase();
  return `import {
  CREATE_${upperName},
  READ_${upperName}_ALL,
  READ_${upperName},
  UPDATE_${upperName},
  DELETE_${upperName},
  READ_LOADING_${upperName},
  WRITE_LOADING_${upperName},
  SET_${upperName}_ERROR,
  CLEAR_ERRORS
} from "../types";
import axios from "axios";

import { addMessageUtil } from "./actionsUtil.js";

export const get${bigName}s = () => async dispatch => {
  dispatch({ type: READ_LOADING_${upperName} });
  try {
    const ${smallName}s = await axios.get("/${smallName}");
    dispatch({ type: READ_${upperName}_ALL, payload: ${smallName}s.data });
    return ${smallName};
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_${upperName}_ERROR,
      payload: err.response.data
    });
  }
};

export const get${bigName} = id => async dispatch => {
  dispatch({ type: READ_LOADING_${upperName} });
  try {
    const ${smallName} = await axios.get("/${smallName}/" + id);
    dispatch({ type: READ_${upperName}, payload: ${smallName}.data });
    return ${smallName};
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_${upperName}_ERROR,
      payload: err.response.data
    });
  }
};

export const create${bigName} = (data, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_${upperName} });
  try {
    const ${smallName} = await axios.post("/${smallName}", data);
    dispatch({ type: CREATE_${upperName}, payload: ${smallName}.data });
    addMessageUtil({ message: "${bigName} created successfully", timeout: 4000 }, dispatch);
    history.push(\`/${smallName}\`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_${upperName}_ERROR,
      payload: err.response.data
    });
  }
};

export const edit${bigName} = (id, ${smallName}, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_${upperName} });
  try {
    const ${smallName}Data = await axios.put(\`/${smallName}/\${id}\`, ${smallName});
    dispatch({
      type: UPDATE_${upperName},
      payload: ${smallName}Data.data
    });
    addMessageUtil(
      { message: "${bigName} updated successfully", timeout: 4000 },
      dispatch
    );
    history.push(\`/${smallName}/\${id}\`);
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_${upperName}_ERROR,
      payload: err.response.data
    });
  }
};

export const delete${bigName} = (id, history) => async dispatch => {
  dispatch({ type: WRITE_LOADING_${upperName} });
  try {
    const ${smallName} = await axios.delete("/${smallName}/" + id);
    dispatch({ type: DELETE_${upperName}, payload: ${smallName}.data });
    addMessageUtil(
      { message: "${bigName} deleted successfully", timeout: 4000 },
      dispatch
    );
    history.push("/${smallName}");
  } catch (err) {
    console.log(err);
    console.log(err.response.data);
    dispatch({
      type: SET_${upperName}_ERROR,
      payload: err.response.data
    });
  }
};
`;
};


// let code = getActions(["todo", "project"]);
// console.log(code);