exports.getAllComps = objects => {
  let alls = [];
  objects.forEach(object => {
    let code = {};
    code.name = object;
    code.code = getAllComp(object);
    alls.push(code);
  });
  return alls;
};

let getAllComp = objName => {
  const smallName = objName;
  const bigName = smallName.charAt(0).toUpperCase() + smallName.substring(1);
  return `import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SimpleCard from "../view/SimpleCard";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {};

class All${bigName}Card extends Component {
  render() {
    const ${smallName}s = this.props.${smallName}s;
    return (
      <Fragment>
        {${smallName}s &&
          ${smallName}s.length > 0 &&
          ${smallName}s.map(${smallName} => {
            if (${smallName}.status !== "done") {
              const topHeader = ${smallName}.username;
              const title = ${smallName}.name;
              const subTitle = ${smallName}.status;
              const content = "";
              const link = {
                title: "Open ${bigName}",
                url: \`/${smallName}/\${${smallName}.id}\`
              };
              return (
                <SimpleCard
                  key={${smallName}.id}
                  topHeader={topHeader}
                  title={title}
                  subTitle={subTitle}
                  content={content}
                  link={link}
                />
              );
            }
            return <Fragment key={${smallName}.id}></Fragment>;
          })}
      </Fragment>
    );
  }
}

All${bigName}Card.propTypes = {
  classes: PropTypes.object.isRequired,
  ${smallName}s: PropTypes.array.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(All${bigName}Card));
`;
};

// let code = getAllComp("todo");
// console.log(code);
