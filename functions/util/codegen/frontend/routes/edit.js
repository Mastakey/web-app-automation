exports.getEdits = objects => {
  let edits = [];
  objects.forEach(object => {
    let code = {};
    code.name = object.name;
    code.code = getEdit(object.name, object.fields);
    edits.push(code);
  });
  return edits;
};

let getEdit = (objName, fields) => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  const fieldHashInit = getFieldsHashInit(fields);
  const fieldHashSet = getFieldsHashSet(smallName, fields);
  const fieldHashSave = getFieldsHashSave(fields);
  return `import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { get${bigName}, edit${bigName} } from "../../redux/actions/${smallName}Actions";

//Components
import Edit${bigName} from "../../components/${smallName}/Edit${bigName}";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  },
  textField: {
    marginTop: "20px"
  },
  progress: {
    position: "absolute"
  },
  saveButton: {
    marginRight: "20px",
    width: "100px"
  }
};

class ${smallName}Edit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
  ${fieldHashInit}
    };
  }
  async componentDidMount() {
    await this.props.get${bigName}(this.props.match.params.id);
    const ${smallName} = this.props.${smallName}.${smallName};
    const errors = this.props.${smallName}.errors;
    if (!errors || !(errors.length > 0)) {
      this.setState({
        name: ${smallName}.name,
        description: ${smallName}.description,
        descriptionDelta: ${smallName}.descriptionDelta,
${fieldHashSet}
      });
    }
  }
  async edit${bigName}(data) {
    await this.props.edit${bigName}(
      this.props.match.params.id,
      data,
      this.props.history
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleQuillChange(value, delta, source, editor) {
    this.setState({
      description: editor.getHTML(),
      descriptionDelta: editor.getContents()
    });
  }
  handleSave = async event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      description: this.state.description,
      descriptionDelta: this.state.descriptionDelta,
${fieldHashSave}
    };
    await this.props.edit${bigName}(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    const loading = this.props.${smallName}.readLoading;
    const saveLoading = this.props.${smallName}.writeLoading;
    const error = this.props.${smallName}.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "${bigName}s", url: "/${smallName}" },
          { name: this.state.name, url: \`/${smallName}/\${this.props.match.params.id}\` }
        ]}
        currentPage={{ name: "Edit", url: "#" }}
        title={"${bigName}s"}
      />
    );
    let body;
    let footer = <Fragment></Fragment>;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <Edit${bigName}
          handleSave={this.handleSave.bind(this)}
          handleChange={this.handleChange.bind(this)}
          handleQuillChange={this.handleQuillChange.bind(this)}
          id={this.props.match.params.id}
          loading={saveLoading}
          state={this.state}
          error={error}
        />
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

${smallName}Edit.propTypes = {
  classes: PropTypes.object.isRequired,
  get${bigName}: PropTypes.func.isRequired,
  edit${bigName}: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  ${smallName}: state.${smallName}
});

export default connect(mapStateToProps, { get${bigName}, edit${bigName} })(
  withStyles(styles)(${smallName}Edit)
);
`;
};

let getFieldsHashSet = (smallName, fields) => {
  let code = "";
  fields.forEach(field => {
    code += `      ${field}: ${smallName}.${field},\n`;
  });
  return code;
};

let getFieldsHashInit = fields => {
  let code = "";
  fields.forEach(field => {
    code += `        ${field}: "",\n`;
  });
  return code;
};

let getFieldsHashSave = fields => {
  let code = "";
  fields.forEach(field => {
    code += `      ${field}: this.state.${field},\n`;
  });
  return code;
};


// let code = getEdit("todo", ["projectId", "status"]);
// console.log(code);