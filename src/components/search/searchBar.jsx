import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchBar extends Component {
  state = {};

  render() {
    const { onEnter, onSpace, onSearch } = this.props;

    return (
      <Grid container justify="center">
        <Grid item xs={10}>
          <input
            type="text"
            name="search"
            className="searchBar"
            id="searchBar"
            placeholder="eg: Chicken, Bacon, Ranch"
            onKeyUp={event => {
              onSpace(event);
              onEnter(event);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <button
            className="searchButton"
            onClick={() => onSearch()}
          >
            <div className="searchIconContainer">
              <FontAwesomeIcon icon="search" className="searchIcon" />
            </div>
          </button>
        </Grid>
      </Grid>
    );
  }
}

export default SearchBar;
