const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 3003;
const app = express();
const notes = require('./db/db.json')
const path = require('path')
const { v4: uuidv4 } = require('uuid');

//middleware
app.use(express.static('public'));
// middle ware: parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// middle ware cont: parse incoming JSON data 
app.use(express.json());


// get routes for api
app.get('/api/notes', (req, res) => {
    res.json(notes);
});


//  post routes CRUD create revieve update delete
app.post('/api/notes', (req, res) => {
    const body = req.body;
    console.log("trying to save", body)
    body.id = uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    notes.push(body);


    fs.writeFile('./db/db.json', JSON.stringify(notes), function(err, data) {
if (err)
throw err
res.json(notes);
    } )

});

// // update routes not needed becasue post updates
// app.put('/api/notes', (req, res) => {
//     let results = notes;
//     res.json(results);
// });

// delete routes
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    console.log('deleteing id:' , id)
    let results = notes;
    res.json(results);
});


// get routes for frontend 'html routes'
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// listen for server
app.listen(PORT, () => {
    console.log(`notes api on port ${PORT} is live. check http://localhost:3003/api/notes`)
});