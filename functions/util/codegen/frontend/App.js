exports.getAppjs = (apiUrl, objects) => {
  const importCode = getImportCode(objects);
  const routeCode = getRouteCode(objects);
  return `import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

//Components
import Navbar from "./components/nav/Navbar";
import Alerts from "./components/alerts/Alerts";

//Routes
import Home from "./routes/Home";
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Signup from "./routes/Signup";

${importCode}

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTH } from "./redux/types";
import { getUserData } from "./redux/actions/userActions";

//Auth
import jwtDecode from "jwt-decode";
import axios from "axios";

axios.defaults.baseURL =
  "${apiUrl}";

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  //console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    //Expired token
    //window.location.href = '/login';
    //store.dispatch(logoutUser());
    //window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTH });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Alerts />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/logout" component={Logout} />
              <Route exact path="/signup" component={Signup} />
  ${routeCode}
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
`;
};

let getImportCode = objects => {
  let code = "";
  objects.forEach(objName => {
    const smallName = objName;
    const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
    code += `//${bigName}
import ${smallName}All from "./routes/${smallName}/${smallName}All";
import ${smallName}View from "./routes/${smallName}/${smallName}View";
import ${smallName}Create from "./routes/${smallName}/${smallName}Create";
import ${smallName}Edit from "./routes/${smallName}/${smallName}Edit";`;
  });
  return code;
};

let getRouteCode = objects => {
  let code = "";
  objects.forEach(smallName => {
    code += `            <Route exact path="/${smallName}" component={${smallName}All} />
              <Route exact path="/${smallName}/create" component={${smallName}Create} />
              <Route exact path="/${smallName}/:id" component={${smallName}View} />
              <Route exact path="/${smallName}/edit/:id" component={${smallName}Edit} />
  `;
  })
  return code;
};

// let code = getAppjs("test", ["todo"]);
// console.log(code);