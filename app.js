const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Lin: iqoIN5sqmJx6o2pt@note-3zsub.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
 const collection = client.db("notedb").collection("note");
 console.log("Databas connected!");
 client.close();

 
});



var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded();

app.use(express.static('html'))

app.get('/', function (req,res){
    res.sendFile(__dirname + '/html/Note.html');
    res.sendFile(__dirname + '/css/styles.css');
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
    res.end(JSON.stringify(more));
})

var server = app.listen(7722, function(){
    console.log('server is up and running' + server.address().port);
});