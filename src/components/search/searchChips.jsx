import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

class SearchChips extends Component {
  state = {};
  render() {
    return (
      <Grid container className="searchChipsContainer" justify="center">
        {this.props.ingredientsList.map(ingr => (
          <Chip
            className="searchChip"
            key={ingr.id}
            onDelete={() => this.props.onDelete(ingr)}
            label={ingr.value}
            color="primary"
          />
        ))}
      </Grid>
    );
  }
}

export default SearchChips;
