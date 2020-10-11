import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";

import SearchBar from "./searchBar";
import SearchChips from "./searchChips";
import SearchFilters from "./searchFilters";
import SearchResults from "./searchResults";

import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles/searchComponent.css";

class SearchComponent extends Component {
  state = {
    ingredientsList: [],
    filters: [
      { name: "Vegetarian", value: false },
      { name: "Vegan", value: false },
      { name: "Peanut-Free", value: false },
      { name: "Tree-Nut-Free", value: false },
      { name: "Sugar-Conscious", value: false },
      { name: "Alcohol-Free", value: false }
    ],
    diets: [
      { name: "Balanced", value: false },
      { name: "High-Protein", value: false },
      { name: "Low-Fat", value: false },
      { name: "Low-Carb", value: false }
    ],
    searchResults: [],
    activeFilter: "",
    activeDiet: "",
    showProgress: false
  };

  handleSearch = () => {
    const axios = require("axios");

    const appID = "45b5811e";
    const appKey = "27d15dda761c02f50a29db59b467d714";

    let filterFrom = "0";
    let filterTo = "100";

    //Create the ingredients query from the current state.ingredientsList
    let ingredientsString = [];

    //Check if anything is in the searchbar and add if so
    let searchBarEl = document.getElementById("searchBar");
    let searchVal = searchBarEl.value;
    searchBarEl.value = "";

    if(searchVal){
      const ingredientsList = [...this.state.ingredientsList]; //Clone ingredients list
      ingredientsList.push({
        id: ingredientsList.length + 1,
        value: searchVal.trim().replace(",", "") //Clean up value
      }); //Add ingredient to list
      this.setState({ ingredientsList }); // Set state
    }

    this.state.ingredientsList.forEach(ingr => {
      ingredientsString.push(ingr.value);
    });
    let ingredientsQuery = ingredientsString.join();

    //Create the filters query from the current state.filters
    let filtersString = [];
    this.state.filters.forEach(filter => {
      if (filter.value === true) {
        filtersString.push(filter.name.toLowerCase());
      }
    });
    let filtersQuery = filtersString.join("&");

    //Create the diets query from the current state.diets
    let dietsString = [];
    this.state.diets.forEach(diet => {
      if (diet.value === true) {
        dietsString.push(diet.name.toLowerCase());
      }
    });
    let dietsQuery = dietsString.join("&");

    //Initialize the search query variable
    let searchUrl = "https://api.edamam.com/";

    //Check if ingredientsList is greater than 0 and if so apply to query
    searchUrl =
      ingredientsString.length > 0
        ? searchUrl + "search?q=" + ingredientsQuery
        : searchUrl + "search?q=meal"; //Generic search if no keywords are entered - can't use 'recipe'

    //Add AppID & AppKey to query
    searchUrl = searchUrl + "&app_id=" + appID + "&app_key=" + appKey;

    //Check if From and To filters are not empty and if so apply to query
    searchUrl =
      filterFrom !== "" && filterTo !== ""
        ? searchUrl + "&from=" + filterFrom + "&to=" + filterTo
        : searchUrl;

    //Check if Health filter is not empty and if so add to query
    searchUrl =
      filtersQuery !== "" ? searchUrl + "&health=" + filtersQuery : searchUrl;

    //Check if Diet filter is not empty and if so add to query
    searchUrl =
      dietsQuery !== "" ? searchUrl + "&diet=" + dietsQuery : searchUrl;

    searchUrl = searchUrl.trim();

    //HTTP Request

    this.resetSearchResults();

    axios
      .get(searchUrl)
      .then(response => {
        // handle success
        console.log(searchUrl);
        console.log(response);

        let searchResults = []; //Clone searchResults array
        response.data.hits.forEach(res => {
          searchResults.push(res); //Add each result hit to the new searchResults array
        });
        /* searchResults.forEach(res => {
          res.id = res.recipe.uri.replace(
            "http://www.edamam.com/ontologies/edamam.owl#recipe_",
            ""
          );
        }); */
        this.setState({ searchResults }); //Set state
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
        console.log(this.state.searchResults);
        this.setState({ showProgress: false });
      });
  };

  resetSearchResults() {
    let searchResults = [];
    this.setState({ searchResults, showProgress: true });
  }

  handleSpaceButton = event => {
    const searchBar = document.getElementById("searchBar");
    const value = searchBar.value;

    //Check button hit is Enter
    if (event.keyCode === 32) {
      document.getElementById("searchBar").value = ""; //Clear SearchBar
      const ingredientsList = [...this.state.ingredientsList]; //Clone ingredients list
      ingredientsList.push({
        id: ingredientsList.length + 1,
        value: value.trim().replace(",", "") //Clean up value
      }); //Add ingredient to list
      this.setState({ ingredientsList }); // Set state
    }
  };

  handleEnterButton = event => {
    const searchBar = document.getElementById("searchBar");
    const value = searchBar.value;

    //Check button hit is Enter
    if (event.keyCode === 13) {
      document.getElementById("searchBar").value = ""; //Clear SearchBar
      const ingredientsList = [...this.state.ingredientsList]; //Clone ingredients list
      //Add ingredient to list
      if (value !== "") {
        ingredientsList.push({
          id: ingredientsList.length + 1,
          value: value
        });
      }
      this.setState({ ingredientsList }); // Set state
      setTimeout(() => {
        this.handleSearch();
      }, 100);
    }
  };

  handleDeleteChip = ingr => {
    const ingredientsList = [...this.state.ingredientsList]; //Clone ingredients array
    const index = ingredientsList.indexOf(ingr);
    ingredientsList.splice(index, 1); //Remove the chip from the new array
    this.setState({ ingredientsList }); //Set state
  };

  resetChips = () => {
    const ingredientsList = [];
    this.setState({ ingredientsList });
  };

  handleCheckFilter = filter => {
    const filters = [...this.state.filters]; //Clone filters array
    const index = filters.indexOf(filter);
    filters[index].value = !filters[index].value;
    this.setState({ filters });
  };

  handleCheckDiet = diet => {
    const diets = [...this.state.diets]; //Clone diets array
    const index = diets.indexOf(diet);
    diets[index].value = !diets[index].value;
    this.setState({ diets });
  };

  handleClearAll = () => {
    const ingredientsList = [];
    let filters = [...this.state.filters]; //Clone filters array
    let diets = [...this.state.diets]; //Clone diets array

    //Set values to false
    for (let i = 0; i < filters.length; i++) {
      filters[i].value = false;
    }
    for (let i = 0; i < diets.length; i++) {
      diets[i].value = false;
    }

    this.setState({ ingredientsList, filters, diets }); //Set states
  };

  sortByIngr = recipes => {
    recipes.sort((a, b) => {
      return a.recipe.ingredients.length - b.recipe.ingredients.length;
    });
  };

  render() {
    return (
      <Grid container justify="center" className="searchWrapper">
        <Grid container className="searchContainer" justify="center">
          <Grid item xs={12}>
            <img
              className="topLogo animated bounceIn delay-1s"
              src={require("../../assets/chefHatLogo.svg")}
              alt="Logo"
              height="250"
              style={{ marginBottom: 30 }}
            />
          </Grid>
          <SearchBar
            onSpace={this.handleSpaceButton}
            onEnter={this.handleEnterButton}
            onSearch={this.handleSearch}
          />
          <SearchChips
            ingredientsList={this.state.ingredientsList}
            onDelete={this.handleDeleteChip}
          />

          <SearchFilters
            filters={this.state.filters}
            diets={this.state.diets}
            onCheckFilter={this.handleCheckFilter}
            onCheckDiet={this.handleCheckDiet}
          />
          <Chip
            className="clearChipsButton"
            label="Clear All"
            color="default"
            onClick={this.handleClearAll}
            style={{ marginBottom: 40 }}
          />
        </Grid>
        <SearchResults
          recipes={this.state.searchResults}
          user={this.props.user}
          userFavorites={this.props.userFavorites}
          onFav={this.props.onFav}
        />
        {this.state.showProgress ? (
          <CircularProgress color="primary" className="circularProgress" />
        ) : null}
      </Grid>
    );
  }
}

export default SearchComponent;
