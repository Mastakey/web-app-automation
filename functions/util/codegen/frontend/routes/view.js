exports.getViews = objects => {
  let views = [];
  objects.forEach(object => {
    let code = {};
    code.name = object;
    code.code = getView(object);
    views.push(code);
  });
  return views;
};

let getView = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  return `import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { get${bigName}, delete${bigName} } from "../../redux/actions/${smallName}Actions";

//Components
import View${bigName} from "../../components/${smallName}/View${bigName}";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  }
};

class ${smallName}View extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.get${bigName}(id);
  }
  async delete${bigName}() {
    const id = this.props.match.params.id;
    await this.props.delete${bigName}(id, this.props.history);
  }
  render() {
    const ${smallName} = this.props.${smallName}.${smallName};
    const loading = this.props.${smallName}.readLoading;
    const error = this.props.${smallName}.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "${bigName}s", url: "/${smallName}" }
        ]}
        currentPage={{ name: ${smallName}.name, url: "/${smallName}" }}
        title={"${bigName}s"}
      />
    );
    let body;
    let footer;
    if (loading) {
      body = (
        <Grid container item xs={12}>
          <LoadingBasic />
        </Grid>
      );
    } else {
      body = <View${bigName} ${smallName}={${smallName}} delete${bigName}={this.delete${bigName}.bind(this)} />;
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

${smallName}View.propTypes = {
  classes: PropTypes.object.isRequired,
  delete${bigName}: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ ${smallName}: state.${smallName} });

export default connect(mapStateToProps, { get${bigName}, delete${bigName} })(
  withStyles(styles)(${smallName}View)
);
`;
};

// let code = getView("todo");
// console.log(code);
