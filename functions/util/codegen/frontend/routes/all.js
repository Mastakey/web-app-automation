exports.getAlls = objects => {
  let alls = [];
  objects.forEach(object => {
    let code = {};
    code.name = object;
    code.code = getAll(object);
    alls.push(code);
  });
  return alls;
};

let getAll = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  return (
    `import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { get${bigName}s } from "../../redux/actions/${smallName}Actions";
import { addMessage } from "../../redux/actions/uiActions";

//Components
//import SimpleTable from "../../components/table/SimpleTable";
import All${bigName}Card from "../../components/${smallName}/All${bigName}Card";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

//Material Icons
import AddIcon from "@material-ui/icons/Add";

const styles = {
  fab: {
    marginTop: "20px"
  }
};

class ${smallName}All extends Component {
  async componentDidMount() {
    this.props.get${bigName}s();
  }
  render() {
    const classes = this.props.classes;
    const ${smallName}s = this.props.${smallName}.${smallName}s;
    const loading = this.props.${smallName}.readLoading;
    const error = this.props.${smallName}.error;
    let header = (
      <PageHeader
        ancestors={[{ name: "Home", url: "/" }]}
        currentPage={{ name: "${bigName}s", url: "/${smallName}" }}
        title={"${bigName}s"}
      />
    );
    let body;
    let footer;
    //loading
    if (loading) {
      body = (
        <Grid container item xs={12}>
          <LoadingBasic />
        </Grid>
      );
    } else {
      body = (
        <Fragment>
          <Grid container item xs={12}>
            <All${bigName}Card ${smallName}s={${smallName}s} />
          </Grid>
          <Grid container item xs={12}>
            <Link to={\`/${smallName}/create\`}>
              <Fab size="small" color="default" className={classes.fab}>
                <AddIcon />
              </Fab>
            </Link>
          </Grid>
        </Fragment>
      );
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {header}
          {Object.keys(error).length === 0 && error.constructor === Object ? (
            <Fragment>{body}</Fragment>
          ) : (
            <ErrorHandler error={error} />
          )}
          {footer}
        </Grid>
      </Grid>
    );
  }
}

${smallName}All.propTypes = {
  classes: PropTypes.object.isRequired,
  get${bigName}s: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  ${smallName}: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ${smallName}: state.${smallName}
});

export default connect(mapStateToProps, {
  get${bigName}s,
  addMessage
})(withStyles(styles)(${smallName}All));
`
  );
};

//let code = getAll("todo");
//console.log(code);