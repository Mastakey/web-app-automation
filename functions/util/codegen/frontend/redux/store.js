exports.getStore = objects => {
  let importCode = getImport(objects);
  let reducerCode = getReducer(objects);
  return `import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
${importCode}
const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  UI: uiReducer,${reducerCode}
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
`;
};

let getImport = objects => {
  let code = "";
  objects.forEach(object => {
    code += `import ${object}Reducer from "./reducers/${object}Reducer";\n`;
  });
  return code;
};

let getReducer = objects => {
  let code = "";
  objects.forEach(object => {
    code += `\n  ${object}: ${object}Reducer,`;
  });
  return code;
};

//let code = getStore(["todo", "project"]);
//console.log(code);
