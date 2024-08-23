var Express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');

var app = Express();
app.use(cors());


var CONNECTION_STRING = "mongodb://localhost:27017/";
var DATABASE_NAME = "Testappdb";
var database;

app.listen(8000, () => {
    MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true }, (error, client) => {
        database = client.db(DATABASE_NAME);
        console.log('Connected to database');
    });
});

app.get('/getdata', (req, res) => {
    database.collection('Testappcollection').find({}).toArray((error, result) => {
        if (error) {
            return res.status(500)
        }
        res.send(result);
    })
});

app.post('/postdata', multer().none(), (req, res) => {
    database.collection('Testappcollection').count({}, (error, count) => {
        database.collection('Testappcollection').insertOne({
            id:(numOfDocs+1).toString(),
            description: req.body.newNotes,
        })
        res.json({message: 'Data added successfully'});
    });
});

app.delete('/deletedata', (req, res) => {
    database.collection('Testappcollection').deleteOne({id: req.query.id});
    res.json({message: 'Data deleted successfully'});
});