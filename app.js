var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Lin: iqoIN5sqmJx6o2pt@note-3zsub.azure.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(url, { useNewUrlParser: true });

MongoClient.connect(url, {useUnifiedTopology:true}, function (err, db) {
    test.equal(null, err);
    test.ok(db != null); 
    var dbo = db.db("Note");
    if (err) throw err;
    console.log("Database up and runnning!");
    db.close();
});



var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser;
app.use(bodyParser.json());
//app.use(bodyParser.urlencodedParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

app.post('/processpost', app.use(bodyParser.urlencoded({
    extended: true
  })), function( req, res){
    
    var rubrik = req.body.rubrik; 
    var textcontent = req.body.textcontent;
    

    //Db
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("Note");
        var mynote = 
            { rubrik: rubrik ,text: textcontent }
        ;

        dbo.collection("Note").insertOne(mynote, function(err, res) {
            if (err) throw err;
            console.log("Number of notes inserted: " + res.insertedCount);
            db.close();
        });
    
});


});



var server = app.listen(7722, function(){
    console.log('server is up and running' + server.address().port);
});