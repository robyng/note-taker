const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 3003;
const app = express();
const { notes } = require('./db/db.json')
const path = require('path')

app.use(express.static('public'));


// get routes for api
app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

// get routes for frontend
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//  post routes CRUD create revieve update delete
app.post('/api/notes', (req, res) => {
    const body = req.body;
    console.log("trying to save", body)
    let results = notes;
    res.json(results);
});

// update routes not needed becasue post updates
app.put('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

// delete routes
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    console.log('deleteing id:' , id)
    let results = notes;
    res.json(results);
});


// listen for server
app.listen(PORT, () => {
    console.log(`notes api on port ${PORT} is live. check http://localhost:3003/api/notes`)
});