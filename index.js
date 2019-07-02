const express = require("express");
const server = express();

server.use(express.json());

//Query params = ?teste=1
//Route params = /teste/1
//Request body = {'name': 'teste', 'email':'email@email'}
//CRUD - Create, Read, Update, Delete

const users = ["Cláudio", "Diego", "Victor"];

function checkUsersInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user) {
    return req.status(400).json({ error: "User does not exists" });
  }

  req.user = user;

  return next();
}

server.get("/users/:index", checkUsersInArray, (req, res) => {
  return res.json(users);
});

server.get("/users/", (req, res) => {
  return res.json(users);
});

server.post("/users", (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

server.put("/users/:index", (req, res) => {
  const { name } = req.body;
  const { index } = req.params;
  users[index] = name;

  return res.json(users);
});

server.delete("/users/:index", (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);
  return res.send();
});

server.listen(3000);
