const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Linus:abQZg3BjOq1KqG8B@test-si7mo.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



//Behöver funktionabel kod och att mongolDB funkar


var url = 'mongodb://localhost:27017/test';

co(function*() {
  const db = yield MongoClient.connect(url);
  console.log("Connected successfully to server");
  
  yield insertDocuments(db, null);
  yield findDocuments(db, null);
  yield indexCollection(db, null);
  yield aggregateDocuments(db, null);

  db.close();
}).catch(err => console.log(err));

function insertDocuments (db, callback) {
    return co(function*() {
      const Notes = [ 
        {
            "Title": "N1",
            "Text": "Text1"
        }, {
            "Title": "N2",
            "Text": "Text2"
        }
      ]
  
      const results = yield db
        .collection('Notes')
        .insertMany(Notes);
      
      console.log(results)
      return results;
    });
  };
  
  function findDocuments (db) {
    return co(function*() {
      // Get the documents collection
      const collection = db.collection('Notes');
      const docs = yield collection.find({}).toArray();
      console.log("Found the following records");
      console.log(docs)
      return docs;
    });
  };

  function indexCollection (db) {
    return co(function*() {
      const results = yield db
        .collection('Notes')
        .createIndex({ "name": 1 }, null);
  
      console.log(results);
      return results;
    });
  };

  function aggregateDocuments (db, callback) {
    return co(function*() {
      const results = yield db
        .collection('Notes').aggregate([
          { '$match': {
            "categories": "Bakery"
          } },
          { '$group': {
            '_id': "$stars",
            'count': { '$sum': 1 }
          } }
        ])
        .toArray();
  
      console.log(results)
      return results;
    });
  };
  
  