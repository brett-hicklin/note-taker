const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const fs = require('fs');
const db = require('./db/db.json')
const { v4: uuidv4 } = require('uuid');
const { json } = require('express');



app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res)=> {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// read dbjson and return all saves notes as json
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json','utf8',(err,data)=>{
        if (err) {
            console.error(err);
          } else {
            return res.json(JSON.parse(data))
          }
    })

})
app.post('/api/notes', (req,res)=> {
    
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const jsonData = JSON.parse(data);
          req.body.id = uuidv4();
          jsonData.push(req.body);
          console.log(jsonData);
          fs.writeFile('./db/db.json', JSON.stringify(jsonData), (err)=>{
            if(err){
            console.log(err);
            }
          })
          return res.json(req.body);
        }
      })
})

app.get('*', (req,res)=> {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

// delete user's note by ID
app.delete('/api/notes/:id', (req, res)=>{
    const id = req.params.id

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const jsonData = JSON.parse(data);
          const newArray = jsonData.filter((object) => {
            return object.id !== id;
          });
          
          fs.writeFile('./db/db.json', JSON.stringify(newArray), (err)=>{
            if(err){
            console.log(err);
            }
          })
          return res.json(req.body);
        }
      })

})





app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);