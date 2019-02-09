import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

class FooterComponent extends Component {
  state = {};
  render() {
    return (
      <Grid container justify="center">
        <Grid item>
          <div
            id="edamam-badge"
            data-color="badge"
            className="animated fadeIn delay-2s"
          />
        </Grid>
      </Grid>
    );
  }
}

export default FooterComponent;
