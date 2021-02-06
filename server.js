var express = require("express");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 4000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Display HTML data
// app.get("/assets/js/index.js", function(req, res){
//     res.sendFile(path.join(__dirname, "./public/assets/js/index.js"));
// });

// app.get("/assets/css/styles.css", function(req, res){
//     res.sendFile(path.join(__dirname, "./public/assets/css/styles.css"));
// });

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//Display Apidata
app.get("/api/notes", function(req, res){

    fs.readFile("./db/db.json","utf8",function(err,data){
        if(err)
        {
            console.log(err);
        }else
        {
            var dbNotes = JSON.parse(data);
            return res.json(dbNotes);
        }
    });
});

app.post("/api/notes", function(req, res){
    var value = req.body;
    value["id"] = value.title;
    //database.push(value);

    fs.readFile("./db/db.json","utf8",function(err,data){
        if(err)
        {
            console.log(err);
        }else
        {
            var dbNotes = JSON.parse(data);
            dbNotes.push(value);
            var json = JSON.stringify(dbNotes);
            fs.writeFile("./db/db.json",json,"utf8",function(err){
                if(err) throw err;
                console.log("saved");
            })
        }

    });

    res.json(value);

    
});

app.delete("/api/notes/:id", function(req,res){
    var deleteVal = req.params.id;
    var newArray;

    console.log(deleteVal);

    fs.readFile("./db/db.json","utf8",function(err,data){
        if(err)
        {
            console.log(err); 
        }else
        {
            var dbNotes = JSON.parse(data);
             newArray = dbNotes.filter((values) => values["id"] !== deleteVal );
            //console.log(newArray);
            var json = JSON.stringify(newArray);
            fs.writeFile("./db/db.json",json,"utf8",function(err){
                if(err) throw err;
                console.log("saved");
            });
        }

    });
    res.send("message sent");

});

app.listen(PORT, function(){
    console.log(`This is port ${PORT} that i am using`);
});