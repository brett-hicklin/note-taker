const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
const fs = require('fs');
const db = require('./db/db.json')



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

app.post('/api/notes', (req,res)=> {
    //should receive a new note to save on the request body,
    // add it to the db.json file, and then return the new note to the client. 
})






app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);