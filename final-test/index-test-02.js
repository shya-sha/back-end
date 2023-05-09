const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const morgan = require("morgan");

const app = express();
const port = 3000;
const uri = "mongodb://localhost:27017/";
const databaseName = "kampus";
const collectionName = "matakuliah";

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/${dbName}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error(error));

const matakuliahSchema = new mongoose.Schema({
  kode: { type: String, required: [true, 'kode matakuliah harus diisi'] },
  namaMatakuliah: { type: String, required: [true, 'nama matakuliah harus diisi'] },
  sks: Number,
});

// middleware
app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// middleware untuk routing 404
app.use(function(req, res, next) {
    res.status(404).send({
      status: "error",
      message: "resource tidak ditemukan"
    });
  });
  
// middleware untuk menangani error
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send({
      status: "error",
      message: "terjadi kesalahan pada server"
    });
  });

// middleware untuk handling CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  });

// GET all matakuliah
app.get('/matakuliah', function(req, res) {
    MongoClient.connect(uri, function(err, client) {
        if (err) throw err;
        const db = client.db(databaseName);
        db.collection(collectionName).find({}).toArray(function(err, result) {
            if (err) throw err;
            var jsonData = {
                status: "success",
                message: "Data retrieved successfully",
                data: result
            };
            res.json(jsonData);
            client.close();
        });
    });
});

// GET matakuliah by kode
app.get('/matakuliah/:kode', function(req, res) {
    MongoClient.connect(uri, function(err, client) {
        if (err) throw err;
        const db = client.db(databaseName);
        db.collection(collectionName).findOne({ kode: req.params.kode }, function(err, result) {
            if (err) throw err;
            var jsonData;
            if (result) {
                jsonData = {
                    status: "success",
                    message: "Data retrieved successfully",
                    data: result
                };
            } else {
                jsonData = {
                    status: "error",
                    message: "Data not found"
                };
            }
            res.json(jsonData);
            client.close();
        });
    });
});

// POST a new matakuliah
app.post('/matakuliah', function(req, res) {
    MongoClient.connect(uri, function(err, client) {
        if (err) throw err;
        const db = client.db(databaseName);
        db.collection(collectionName).insertOne(req.body, function(err, result) {
            if (err) throw err;
            var jsonData = {
                status: "success",
                message: "Data added successfully",
                data: req.body
            };
            res.json(jsonData);
            client.close();
        });
    });
});

// DELETE a matakuliah by kode
app.delete('/matakuliah/:kode', function(req, res) {
    MongoClient.connect(uri, function(err, client) {
        if (err) throw err;
        const db = client.db(databaseName);
        db.collection(collectionName).deleteOne({ kode: req.params.kode }, function(err, result) {
            if (err) throw err;
            var jsonData = {
                status: "success",
                message: "Data deleted successfully"
            };
            res.json(jsonData);
            db.close();
        });
    });
});


app.put('', function(req, res) {
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("college");
        var newValues = { $set: req.body };
        dbo.collection(collectionName).updateOne({ kode: req.params.kode }, newValues, function(err, result) {
            if (err) throw err;
            var jsonData = {
                status: "success",
                message: "Data updated successfully"
            };
            res.json(jsonData);
            db.close();
        });
    });
});

// listen to port
app.listen(port, function() {
    console.log(`Server started at http://localhost:${port}`);
});

            
