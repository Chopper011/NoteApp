var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded();

app.get('/', function (req,res){
    res.sendfile(__dirname + '/Note.html');
    res.sendfile(+ '/styles.css');
})
app.get('/OmOss.html', function(req, res){
    res.sendfile(__dirname + "/OmOss.html");
})
app.get('/TNote.html', function(req, res){
    res.sendfile(__dirname + "/TNote.html");
})
app.get('/Note.html', function(req, res){
    res.sendfile(__dirname + "/Note.html");
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
    console.log('server is up and running ' + server.address().port);
});
