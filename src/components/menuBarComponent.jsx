import React, { Component } from "react";
import { Delete, Person } from "@material-ui/icons";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Divider,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CircularProgress
} from "@material-ui/core";

import LoginComponent from "./loginComponent";

class MenuBarComponent extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <AppBar
          position="static"
          color="default"
          style={{
            backgroundColor: "white",
            position: "relative",
            boxShadow: "none"
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="User"
              className="userButton hvr-pulse"
              onClick={this.props.toggleUserDrawer}
              style={{ position: "absolute", right: 20 }}
            >
              <Person />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor="right"
          open={this.props.drawerOpen}
          onClose={this.props.toggleUserDrawer}
        >
          <div role="button" style={{ padding: 10, minWidth: "300px" }}>
            {this.props.user ? (
              <div>
                <div style={{ padding: 20, textAlign: "center" }}>
                  <Person style={{ fontSize: 40 }} />
                  <Typography
                    variant="headline"
                    style={{
                      fontSize: 26,
                      fontWeight: "bold",
                      marginBottom: 10
                    }}
                    color="primary"
                  >
                    {this.props.user.username}
                  </Typography>
                  <Button
                    size="small"
                    variant="contained"
                    color="default"
                    onClick={this.props.logoutUser}
                  >
                    Logout
                  </Button>
                </div>
                <Divider />
                <div style={{ textAlign: "center" }}>
                  <Typography
                    style={{
                      margin: 0,
                      marginTop: 10,
                      marginBottom: 15,
                      fontWeight: "bold",
                      fontSize: 22
                    }}
                    variant="headline"
                    color="primary"
                  >
                    Favorite Recipes
                  </Typography>
                  {this.props.userFavs.length > 0 ? (
                    this.props.userFavs.map(fav => (
                      <Card
                        key={Math.floor(Math.random() * 1000)}
                        style={{ marginBottom: 10, maxWidth: "300px" }}
                      >
                        <CardActionArea style={{ width: "100%" }}>
                          <Delete
                            onClick={() => this.props.onDeleteFav(fav)}
                            className="hvr-pulse"
                            style={{
                              position: "absolute",
                              zIndex: "100",
                              top: 15,
                              right: 15,
                              color: "#e53935"
                            }}
                          />
                          <a href={fav.url} target="_blank">
                            <CardContent
                              style={{
                                backgroundImage: `url(${fav.image})`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                height: "150px"
                              }}
                            />

                            <CardContent style={{ padding: 15 }}>
                              <Typography
                                variant="subheading"
                                style={{
                                  fontSize: 16,
                                  fontWeight: "bold"
                                }}
                                color="default"
                              >
                                {fav.label}
                              </Typography>
                            </CardContent>
                          </a>
                        </CardActionArea>
                      </Card>
                    ))
                  ) : this.props.userFavs.length === 0 ? (
                    <div>No favorite recipes</div>
                  ) : (
                    <CircularProgress
                      color="primary"
                      className="circularProgress"
                    />
                  )}
                </div>
              </div>
            ) : (
              <LoginComponent
                user={this.props.user}
                toggleUserDrawer={this.props.toggleUserDrawer}
                createUser={this.props.createUser}
                loginUser={this.props.loginUser}
                warningText={this.props.warningText}
              />
            )}
          </div>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default MenuBarComponent;
