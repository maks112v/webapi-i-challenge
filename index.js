// implement your API here
const express = require('express');

const server = express();

const db = require('./data/db.js');

server.use(express.json());

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(201).json(users)
    })
    .catch(error => {
      res.status(500).json({
        error: "The users information could not be retrieved."
      })
    })
});

server.get('/api/users/:id', (req, res) => {
  const {
    id
  } = req.params;
  db.findById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(error => {
      res.status(404).json({
        message: "The user with the specified ID does not exist."
      })
    })
})

server.post('/api/users', (req, res) => {
  const newUser = req.body;
  console.log(newUser);
  if (newUser.name === undefined || newUser.bio === undefined) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    })
  }
  db.insert(newUser)
    .then(status => {
      res.status(201).json(status)
    })
    .catch(error => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    })
})

server.put('/api/users/:id', (req, res) => {
  const {
    id
  } = req.params;
  const changes = req.body;
  console.log(id);

  db.update(id, changes)
    .then(update => {
      res.status(200).json(update);
    })
    .catch(err => {
      res.status(404).json({
        error: "The user information could not be modified."
      });
    })
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    });
});

server.listen(4000, () => {
  console.log('Api running')
})