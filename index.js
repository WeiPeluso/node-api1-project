const express = require("express");
const server = express();
const shortid = require("shortid");
server.use(express.json());
const PORT = 3000;

let users = [
  {
    id: shortid.generate(),
    name: "wei peluso",
    bio: "web developer",
  },
];
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

server.get("/", (req, res) => {
  res.send("<h1>Node JS first project</h1>");
});

// create a user
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  newUser.id = shortid.generate();
  users.push(newUser);
  res.json(newUser);
});

//get the users array
server.get("/api/users", (req, res) => {
  res.json(users);
});

//get a specified user with id
server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((u) => u.id === id);
  if (user) {
    res.status(200).json(user);
  } else {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  }
});

//delete a specified user
server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const deleted = users.find((u) => u.id === id);
  users = users.filter((u) => u.id !== id);
  console.log(users);
  res.json(deleted);
});

//update a specified user
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const newUserInfo = req.body;
  const updateUser = users.find((u) => u.id === id);
  console.log(updateUser);
  if (updateUser) {
    //found
    Object.assign(updateUser, newUserInfo);
    res.status(200).json(updateUser);
  } else {
    //didn't find hub with that id
    res.status(404).json({ message: "user not found!" });
  }
  res.json(updateUser);
});
