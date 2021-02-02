var express = require("express");
var path = require("path");
var fs = require("fs");
var database = require("./db/db.json")

var app = express();
var PORT = process.env.PORT || 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//var newNote ={"title":"Test Title1","text":"Test text1"};

//database.push(newNote);
///console.log(database)


// Display HTML data
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Display Apidata
app.get("/api/notes", function(req, res){

    //fs.readFile("")

    res.json(database);

});

app.post("/api/notes", function(req, res){
    var value = req.body;
    database.push(value);
    console.log(value);
    console.log(database);
    res.json(value);

    
});

app.delete("/api/notes/:id", function(req,res){

});



app.listen(PORT, function(){
    console.log(`This is port ${PORT} that i am using`);
});