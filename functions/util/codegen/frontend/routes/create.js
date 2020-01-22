exports.getCreates = objects => {
  let creates = [];
  objects.forEach(object => {
    let code = {};
    code.name = object;
    code.code = getCreate(object);
    creates.push(code);
  });
  return creates;
};

let getCreate = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  return `import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { create${bigName} } from "../../redux/actions/${smallName}Actions";

//Components
import Create${bigName} from "../../components/${smallName}/Create${bigName}";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {};

class ${smallName}Create extends Component {
  async create${bigName}(data) {
    await this.props.create${bigName}(data, this.props.history);
  }
  render() {
    const loading = this.props.${smallName}.loading;
    const error = this.props.${smallName}.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "${bigName}s", url: "/${smallName}" }
        ]}
        currentPage={{ name: "Create", url: "#" }}
        title={"Create ${bigName}"}
      />
    );
    let footer;
    let body;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <Create${bigName}
          loading={loading}
          create${bigName}={this.create${bigName}.bind(this)}
          error={error}
        />
      );
    }

    return (
      <Grid container alignItems="center">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {header}
            {body}
            {footer}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

${smallName}Create.propTypes = {
  classes: PropTypes.object.isRequired,
  create${bigName}: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ${smallName}: state.${smallName}
});

export default connect(mapStateToProps, { create${bigName} })(
  withStyles(styles)(${smallName}Create)
);
`;
};

// let code = getCreate("${smallName}");
// console.log(code);
