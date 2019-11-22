const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Lin: iqoIN5sqmJx6o2pt@note-3zsub.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
 const collection = client.db("test").collection("devices");
 console.log("Databas connected!");
 client.close();

 
});

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/note");

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded();

var noteSchema = new mongoose.Schema({
    rubrik: String,
    contenttext: String
  });

  var User = mongoose.model("Note", noteSchema);

  app.post("/processpost", (req, res) => {

    var myData = new User(req.body);
    myData.save()
        .then(item => {
         res.send("Note saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    }   );
 
});



var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded();

app.use(express.static('html'))

app.get('/', function (req,res){
    res.sendfile(__dirname + '/html/Note.html');
    res.sendfile(__dirname + '/css/styles.css');
})
app.get(__dirname + '/OmOss.html', function(req, res){
    res.sendfile(__dirname + "/html/OmOss.html");
})
app.get(__dirname + '/TNote.html', function(req, res){
    res.sendfile(__dirname + "/html/TNote.html");
})
app.get(__dirname + '/Note.html', function(req, res){
    res.sendfile(__dirname + "/html/Note.html");
})

app.post('/processpost', urlencodedParser, function(req, res){
    more = {
        rubrik:req.body.rubrik, 
        textcontent:req.body.textcontent
    };
    console.log(more);
    res.end(JSON.stringify(more))
})

var server = app.listen(7722, function(){
    console.log('server is up and running' + server.address().port);
});