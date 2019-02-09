import React, { Component } from "react";
import "./App.css";
import "./styles/hover.css";
import "./styles/animate.min.css";
import Grid from "@material-ui/core/Grid";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";

import MenuBarComponent from "./components/menuBarComponent";
import SearchComponent from "./components/search/searchComponent";
import FooterComponent from "./components/footerComponent";

import fire from "./config/fire";

library.add(faSearch, faUser);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#008000"
    },
    secondary: {
      main: "#ffeb3b"
    }
  },
  typography: {}
});

const db = fire.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
db.settings(settings);

const axios = require("axios");
const appID = "45b5811e";
const appKey = "27d15dda761c02f50a29db59b467d714";

class App extends Component {
  state = {
    user: {},
    userFavs: [],
    userDrawerActive: false,
    drawerOpen: false,
    warningText: ""
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        //Do something
        db.collection("users")
          .where("email", "==", user.email)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size > 0) {
              //Do something with the data
              querySnapshot.docs.forEach(documentSnapshot => {
                this.setState({ user: documentSnapshot.data() }, () => {
                  //console.log("found user logged in:", this.state.user);
                  this.handleDrawerSync();
                });
              });
            }
          });
      } else {
        this.setState({ user: null });
      }
    });
  }

  handleFav = data => {
    const user = Object.assign({}, this.state.user); //Clone the user object
    let userFavorites = user.favorites; //Clone favorites array

    //Check if the recipe is already favorited
    if (!userFavorites.includes(data.recipe.uri)) {
      userFavorites.push(data.recipe.uri); //Add the recipe to the array
    } else {
      //If recipe already favorited
      userFavorites.splice(userFavorites.indexOf(data.recipe.uri), 1); //Remove recipe from array
    }

    user.favorites = userFavorites; //Put the new array into our local user array

    this.setState({ user }, () => {
      //SYNC TO DB
      db.collection("users")
        .doc(this.state.user.username)
        .set({
          username: this.state.user.username,
          email: this.state.user.email,
          password: this.state.user.password,
          favorites: this.state.user.favorites
        })
        .then(() => {
          console.log("Document successfully written!");
          this.handleDrawerSync();
        })
        .catch(error => {});
    }); //Set state
  };

  handleDeleteFav = data => {
    console.log(data);
    const user = Object.assign({}, this.state.user); //Clone the user object
    let userFavorites = user.favorites; //Clone favorites array

    //If recipe already favorited
    userFavorites.splice(userFavorites.indexOf(data.uri), 1); //Remove recipe from array

    user.favorites = userFavorites; //Put the new array into our local user array

    this.setState({ user }, () => {
      //SYNC TO DB
      db.collection("users")
        .doc(this.state.user.username)
        .set({
          username: this.state.user.username,
          email: this.state.user.email,
          password: this.state.user.password,
          favorites: this.state.user.favorites
        })
        .then(() => {
          console.log("Document successfully written!");
          this.setState({ userFavs: this.state.user.favorites }, () => {
            this.handleDrawerSync();
          });
        })
        .catch(error => {});
    }); //Set state
  };

  toggleUserDrawer = () => {
    const drawerOpen = !this.state.drawerOpen;
    this.setState({ drawerOpen, warningText: "" });
  };

  handleCreateUser = data => {
    console.log("handle submit user", data);

    //Regex Test Username & Password
    if (/^[a-zA-Z0-9_-]{4,15}$/.test(data.username)) {
      db.collection("users")
        .doc(data.username)
        .get()
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            this.setState({ warningText: "Username is already taken" });
          } else {
            if (
              /^([A-Za-z0-9_\-.+])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(
                data.email
              )
            ) {
              if (/^[a-zA-Z0-9_-]{4,15}$/.test(data.password)) {
                fire
                  .auth()
                  .createUserWithEmailAndPassword(data.email, data.password)
                  .then(() => {
                    db.collection("users")
                      .doc(data.username)
                      .set({
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        favorites: []
                      })
                      .then(() => {
                        console.log("Document successfully written!");
                      })
                      .catch(error => {});
                  })
                  .catch(error => {
                    this.setState({
                      warningText: "E-mail address is already in use"
                    });
                    console.log("Error writing document: ", error.message);
                  });
              } else {
                this.setState({ warningText: "Invalid password" });
                console.log("Invalid Password");
              }
            } else {
              this.setState({ warningText: "Invalid e-mail address" });
              console.log("Invalid E-Mail Address");
            }
          }
        });
    } else {
      this.setState({ warningText: "Invalid Username" });
      console.log("Invalid username");
    }
  };

  handleLoginUser = data => {
    //console.log("handle login user", data);
    let user = {};
    db.collection("users")
      .doc(data.username)
      .get()
      .then(doc => {
        if (doc.exists) {
          //console.log("Data:", doc.data());
          user = doc.data();
          validateLogin(data, user);
        } else {
          this.setState({ warningText: "Username does not exist" });
          console.log("Username does not exist");
        }
      });

    const validateLogin = (data, user) => {
      if (data.password === user.password) {
        fire
          .auth()
          .signInWithEmailAndPassword(user.email, user.password)
          .then(() => {
            console.log("User logged in");
            this.setState({ user });
            this.toggleUserDrawer();
          });
      } else {
        this.setState({ warningText: "Password is incorrect" });
        console.log("Password is incorrect");
      }
    };
  };

  handleLogoutUser = () => {
    console.log("logout user");
    this.setState({ warningText: "" });
    fire.auth().signOut();
  };

  handleDrawerSync = () => {
    if (this.state.user.favorites) {
      let tempFavs = [];
      this.state.user.favorites.forEach(fav => {
        let favID = fav.replace(
          "http://www.edamam.com/ontologies/edamam.owl#recipe_",
          ""
        );
        const searchUrl =
          "https://api.edamam.com/search?r=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_" +
          favID +
          "&app_id=" +
          appID +
          "&app_key=" +
          appKey;
        axios.get(searchUrl).then(response => {
          // handle success
          tempFavs.push(response.data[0]);
          this.setState({ userFavs: tempFavs });
          //console.log(response.data[0]);
        });
      });
    }
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Grid container className="App">
          <MenuBarComponent
            toggleUserDrawer={this.toggleUserDrawer}
            drawerOpen={this.state.drawerOpen}
            drawerSync={this.handleDrawerSync}
            user={this.state.user}
            userFavs={this.state.userFavs}
            createUser={this.handleCreateUser}
            loginUser={this.handleLoginUser}
            logoutUser={this.handleLogoutUser}
            warningText={this.state.warningText}
            onDeleteFav={this.handleDeleteFav}
          />
          <SearchComponent onFav={this.handleFav} user={this.state.user} />
          <FooterComponent />
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
