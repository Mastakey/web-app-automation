exports.getCreateComps = objects => {
  let creates = [];
  objects.forEach(object => {
    let code = {};
    code.name = object.name;
    code.code = getCreateComp(object.name, object.fields);
    creates.push(code);
  });
  return creates;
};

let getCreateComp = (objName, fields) => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  const fieldHashInit = getFieldsHashInit(fields);
  const fieldHashSave = getFieldsHashSave(fields);
  const fieldInputs = getFieldsInputs(fields);
  return `import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Components
import ErrorMessages from "../error/ErrorMessages";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

//Quill
import ReactQuill from "react-quill";
import QuillSettings from "../quill/QuillSettings";
import "react-quill/dist/quill.snow.css";

const styles = {
  textField: {
    marginTop: "20px"
  },
  progress: {
    position: "absolute"
  },
  submitButton: {
    marginRight: "10px"
  },
  richText: {
    marginTop: "20px"
  }
};

class Create${bigName} extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
${fieldHashInit}
    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      description: this.state.description,
      descriptionDelta: this.state.descriptionDelta,
${fieldHashSave}
    };
    await this.props.create${bigName}(data);
  };
  handleCancel = async event => {};

  handleQuillChange(value, delta, source, editor) {
    this.setState({
      description: editor.getHTML(),
      descriptionDelta: editor.getContents()
    });
  }
  render() {
    const classes = this.props.classes;
    const loading = this.props.loading;
    const error = this.props.error;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            name="name"
            autoComplete="off"
            label="Name"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <ReactQuill
            className={classes.richText}
            value={this.state.description}
            modules={QuillSettings.modules}
            formats={QuillSettings.formats}
            name="description"
            placeholder="Description"
            onChange={this.handleQuillChange.bind(this)}
          />
${fieldInputs}
        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={this.handleSubmit}
          >
            Submit
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={\`/${smallName}\`}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ErrorMessages error={error} />
        </Grid>
      </Grid>
    );
  }
}

Create${bigName}.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  create${bigName}: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(Create${bigName}));
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

let getFieldsInputs = fields => {
  let code = "";
  fields.forEach(field => {
    const bigName = field.charAt(0).toUpperCase() + field.substring(1);
    code += `          <TextField
            className={classes.textField}
            name="${field}"
            autoComplete="off"
            label="${bigName}"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
`;
  });
  return code;
};

// let code = getCreateComp("todo");
// console.log(code);
