import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Person } from "@material-ui/icons";
import { Typography, Button, TextField, Divider } from "@material-ui/core";

const styles = theme => ({
  container: {
    flexWrap: "wrap",
    display: "block"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: 20,
    boxShadow: "none"
  },
  already: {
    margin: 10
  },
  alreadyButton: {
    color: "green",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline"
    }
  },
  warningText: {
    margin: 10,
    marginBottom: 0,
    fontSize: 14,
    color: "red"
  }
});

class LoginComponent extends Component {
  state = {
    hasAccount: true,
    username: "",
    email: "",
    password: ""
  };

  componentWillMount() {
    if (this.props.user) {
      this.setState({ hasAccount: true });
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCancel = () => {
    this.setState({ username: "", email: "", password: "" });
    this.props.toggleUserDrawer();
  };

  handleAlready = () => {
    this.setState({
      hasAccount: !this.state.hasAccount
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        {this.state.hasAccount ? (
          <React.Fragment>
            <div style={{ padding: 20, textAlign: "center" }}>
              <Person style={{ fontSize: 40 }} />
              <Typography
                variant="headline"
                style={{ fontSize: 20, fontWeight: "bold" }}
              >
                Login
              </Typography>
            </div>
            <Divider />
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="username"
                label="Username"
                className={classes.textField}
                value={this.state.username}
                onChange={this.handleChange("username")}
                margin="normal"
              />
              <br />
              <TextField
                type="password"
                id="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange("password")}
                margin="normal"
              />
              <br />
              <div className={classes.warningText}>
                {this.props.warningText}
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.props.loginUser(this.state)}
              >
                Log In
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={this.handleCancel}
              >
                Cancel
              </Button>

              <div className={classes.already}>
                Don't have an account?{" "}
                <span
                  className={classes.alreadyButton}
                  onClick={this.handleAlready}
                >
                  Create Account
                </span>
              </div>
            </form>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ padding: 20, textAlign: "center" }}>
              <Person style={{ fontSize: 40 }} />
              <Typography
                variant="headline"
                style={{ fontSize: 20, fontWeight: "bold" }}
              >
                Create Account
              </Typography>
            </div>
            <Divider />
            <form className={classes.container} noValidate autoComplete="off">
              <TextField
                id="username"
                label="Username"
                className={classes.textField}
                value={this.state.username}
                onChange={this.handleChange("username")}
                margin="normal"
              />
              <br />
              <TextField
                id="email"
                label="E-Mail"
                className={classes.textField}
                value={this.state.email}
                onChange={this.handleChange("email")}
                margin="normal"
              />
              <br />
              <TextField
                type="password"
                id="password"
                label="Password"
                className={classes.textField}
                value={this.state.password}
                onChange={this.handleChange("password")}
                margin="normal"
              />
              <br />
              <div className={classes.warningText}>
                {this.props.warningText}
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.props.createUser(this.state)}
              >
                Create
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
              <div className={classes.already}>
                Already have an account?{" "}
                <span
                  className={classes.alreadyButton}
                  onClick={this.handleAlready}
                >
                  Log In
                </span>
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    );
  }
}

LoginComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginComponent);
