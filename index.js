// implement your API here
// $$ yarn add express cors
const cors = require("cors"); // installs cors
const express = require("express"); //imports the express package
const Data = require("./data/db.js"); //import the data file
const server = express(); //creates express application using express module.

const port = 6050;

server.listen(port, () =>
  console.log(`\n*** Listening on port: ${port} ***\n`)
);

// ===MIDDLEWARE===
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
    Data.insert(req.body)
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
  Data.find()
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
  Data.findById(req.params.id)
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
  Data.remove(req.params.id)
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
  const { id } = req.params;
  console.log(req.params); // {id: '19'}
  console.log(req.body); // {name: '<entered>', bio: '<desc>'}
  if (!name || !bio) {
    res
      .status(400) //Bad request
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Data.findById(id)
      .then(user => {
        if (!!user) {
          Data.update(id, req.body)
            .then(userA => {
              console.log(userA);
              Data.findById(id)
                .then(element => {
                  res
                    .status(200) //Ok
                    .json(element);
                })
                .catch(e => {
                  res
                    .status(504) //server error
                    .json({
                      errorMessage: "The user information could not be modified"
                    });
                });
            })
            .catch(e => {
              res
                .status(500) //server error
                .json({
                  errorMessage: "The user information could not be modified"
                });
            });
        } else {
          res
            .status(404) //user NOT found
            .json({
              message: "The user with the specified ID does not exist."
            });
        }
      })
      .catch(e => {
        res
          .status(500) //server error
          .json({ errorMessage: "The user information could not be modified" });
      });
  }
});

//TESTING RESULTS FROM INSOMNIAC...
/*
url: localhost:6050

get (/api/users) - gives list of hobbits
post (/api/users),(with: {'name': '<name>', "bio": "<description>"}  )
    - returns "id": 3
    ) 
get (/api/users/1) - gives info for 1 hobbit
delete (/api/users/1) - removes user with id # that matches.
put (/api/user/1), with: {"name": "<name>", "bio": "<new description>" }
    - returns id number; data is updated

*/
