import React, { Component } from "react";
import { Grid, FormGroup, FormControlLabel, Checkbox } from "@material-ui/core";

const styles = {
  filterContainer: {
    margin: "auto",
  },
  filter: {
    width: "50%",
    maxWidth: "200px",
    margin: 0,
  },
};

class SearchFilters extends Component {
  render() {
    const { onCheckFilter, onCheckDiet } = this.props;

    return (
      <Grid container className="searchFiltersWrapper">
        <Grid container className="searchFiltersContainer" justify="center">
          <FormGroup row style={{ ...styles.filterContainer }}>
            {this.props.filters.map((filter) => (
              <FormControlLabel
                key={this.props.filters.indexOf(filter)}
                control={
                  <Checkbox
                    checked={
                      this.props.filters[this.props.filters.indexOf(filter)]
                        .value === true
                        ? true
                        : false
                    }
                    onChange={() => onCheckFilter(filter)}
                    color="primary"
                  />
                }
                label={filter.name}
                style={{ ...styles.filter }}
              />
            ))}
            {this.props.diets.map((diet) => (
              <FormControlLabel
                key={this.props.diets.indexOf(diet)}
                control={
                  <Checkbox
                    checked={
                      this.props.diets[this.props.diets.indexOf(diet)].value ===
                      true
                        ? true
                        : false
                    }
                    onChange={() => onCheckDiet(diet)}
                    color="primary"
                  />
                }
                label={diet.name}
                style={{ ...styles.filter }}
              />
            ))}
          </FormGroup>
        </Grid>
      </Grid>
    );
  }
}

export default SearchFilters;
