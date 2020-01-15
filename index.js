// implement your API here
// yarn add express
const express = require("express"); //imports the express package
//const http = require('http'); // built in node.js module to handle http traffic
const cors = require("cors");

const Users = require("./data/db.js");

const server = express(); //creates express application using express module.

server.use(express.json());
server.use(cors());

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    //cancel the request, return 400
    res
      .status(400) //Bad request
      .json({ errorMessage: "Please provide name and bio for the user" });
  } else {
    //valid user -> save the new user to the database
    Users.insert(req.body)
      .then(user => {
        res
          .status(201) //created user
          .json(user); //return new created user document
      })
      .catch(() => {
        res
          .status(500) //server error
          .json({
            errorMessage:
              "There was an error while saving the user to the database"
          });
      });
  }
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(user => {
      res
        .status(200) //successful get user info
        .json(user); //return user info
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({
          errorMessage: "The users information could not be retrieved."
        });
    });
});

server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res
          .status(200) //successful get user info
          .json(user); //return user.id info
      } else {
        res
          .status(404) //user not found
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then(users => {
      if (users && users > 0) {
        res
          .status(200) //successful user find
          .json({ message: "The user was deleted." });
      } else {
        res
          .status(404) //user not found
          .json({ message: "The user with that specific ID does not exist." });
      }
    })
    .catch(() => {
      res
        .status(500) //server error
        .json({ errorMessage: "The user could not be removed." });
    });
});

server.put("/api/users/:id", (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400) //Bad request
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res
            .status(200) //successfully updated user info
            .json(user); //return the updated information
        } else {
          res
            .status(404) //user NOT found
            .json({
              message: "The user with the specified ID does not exist."
            });
        }
      })
      .catch(() => {
        res
          .status(500) //server error
          .json({ errorMessage: "The user information could not be modified" });
      });
  }
});

const port = 5000;
server.listen(port, () => console.log(`\n*** API on port ${port} ***\n`));

//TESTING RESULTS FROM INSOMNIAC...
/*
url: localhost:5000

get (/api/users) - gives list of hobbits
post (/api/users),(with: {'name': '<name>', "bio": "<description>"}  )
    - returns "id": 3
    ) 
get (/api/users/1) - gives info for 1 hobbit
delete (/api/users/1) - 
put (/api/user/1), with: {"name": "<name>", "bio": "<new description>" }
    - returns id number; data is updated

*/
