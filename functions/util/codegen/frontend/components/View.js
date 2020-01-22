exports.getViewComps = objects => {
  let views = [];
  objects.forEach(object => {
    let code = {};
    code.name = object;
    code.code = getViewComp(object);
    views.push(code);
  });
  return views;
};

let getViewComp = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  return `import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Components
import DeleteDialog from "../../components/dialog/DeleteDialog";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

//Material Icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  paper: {
    padding: "20px"
  },
  fab: {
    marginTop: "10px"
  },
  fabDelete: {
    float: "right"
  }
};

class View${bigName} extends Component {
  constructor() {
    super();
    this.state = {
      showDeleteDialog: false
    };
  }
  handleDelete() {
    this.setState({
      showDeleteDialog: true
    });
  }
  handleDeleteDialogClose() {
    this.setState({
      showDeleteDialog: false
    });
  }
  render() {
    const classes = this.props.classes;
    const ${smallName} = this.props.${smallName};
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <Fab
                size="small"
                color="secondary"
                className={classes.fabDelete}
                onClick={this.handleDelete.bind(this)}
              >
                <DeleteIcon />
              </Fab>
              <DeleteDialog
                deleteFunction={this.props.delete${bigName}}
                open={this.state.showDeleteDialog}
                handleClose={this.handleDeleteDialogClose.bind(this)}
              />
              <Typography variant="h5">{${smallName}.name}</Typography>
              <Typography variant="body1">
                <span
                  dangerouslySetInnerHTML={{
                    __html: ${smallName}.description
                  }}
                />
              </Typography>
              <Typography variant="body1">{${smallName}.assignee}</Typography>
              <Typography variant="body1">{${smallName}.details}</Typography>
              <Typography variant="body1">{${smallName}.status}</Typography>
              <Typography variant="body1">{${smallName}.priority}</Typography>
              <Link to={\`/${smallName}/edit/\${${smallName}.id}\`}>
                <Fab size="small" color="default" className={classes.fab}>
                  <EditIcon />
                </Fab>
              </Link>
            </Paper>
        </Grid>
      </Grid>
    );
  }
}

View${bigName}.propTypes = {
  classes: PropTypes.object.isRequired,
  delete${bigName}: PropTypes.func.isRequired,
  ${smallName}: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(View${bigName}));
`;
};

// let code = getViewComp("todo");
// console.log(code);
