import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";

import "./styles/searchComponent.css";

import { Star, StarTwoTone } from "@material-ui/icons";

class SearchResults extends Component {
  state = {};
  render() {
    return (
      <Grid container className="searchResultsWrapper" justify="center">
        <Grid container className="searchResultsContainer" spacing={16}>
          {this.props.recipes.map(item => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={this.props.recipes.indexOf(item)}
            >
              <Card>
                <CardActionArea style={{ width: "100%" }}>
                  <div onClick={() => this.props.onFav(item)}>
                    {this.props.user &&
                    this.props.user.favorites.includes(item.recipe.uri) ? (
                      <Star
                        className="hvr-pulse"
                        style={{
                          fontSize: 40,
                          position: "absolute",
                          top: 12,
                          right: 12
                        }}
                        color="secondary"
                      />
                    ) : (
                      <StarTwoTone
                        className="hvr-pulse"
                        style={{
                          color: "white",
                          fontSize: 40,
                          position: "absolute",
                          top: 12,
                          right: 12
                        }}
                      />
                    )}
                  </div>
                  <a href={item.recipe.url} target="_blank">
                    <CardMedia
                      component="img"
                      image={item.recipe.image}
                      width="100"
                    />
                    <CardContent
                      className="cardContent"
                      style={{ padding: 10 }}
                    >
                      <Typography />
                      <h2>{item.recipe.label}</h2>
                      <h4>
                        <span style={{ color: "green", fontSize: 16 }}>
                          {Math.round(item.recipe.calories)}
                        </span>{" "}
                        Calories |{" "}
                        <span style={{ color: "green", fontSize: 16 }}>
                          {item.recipe.yield}
                        </span>{" "}
                        Servings |{" "}
                        <span style={{ color: "green", fontSize: 16 }}>
                          {item.recipe.ingredients.length}
                        </span>{" "}
                        Ingredients
                      </h4>
                      <p style={{ fontSize: 12, fontStyle: "italic" }}>
                        Source: {item.recipe.source}
                      </p>
                    </CardContent>
                  </a>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default SearchResults;
