const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const users = require('./users.js');

const app = express();
const upload = multer({dest:'./public/'});

// Middleware
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// GET /users endpoint
app.get('/users', (req, res) => {
    res.json(users);
});

// GET /users/:name endpoint
app.get('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const user = users.find(user => user.name.toLowerCase() === name);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            status: "error",
            message: "data tidak ditemukan"
        });
    }
});

app.get('/adduser', (req, res) => {
  res.sendFile('/Shya/Back-End Web Development/group-exercise-7/adduser.html');
});

// POST /users endpoint
app.post('/users', (req, res) => {
    const {id, name} = req.body;
    if (!id || !name) {
        res.status(400).json({
            status: "error",
            message: "data tidak lengkap"
        });
    } else {
        users.push({id, name});
        res.json(users);
    }
});

app.get('/upload', (req, res) => {
  res.sendFile('/Shya/Back-End Web Development/group-exercise-7/upload.html');
});

// POST /upload endpoint
app.post('/upload', upload.single('upload'), (req, res) => {
    res.send('file uploaded');
});

app.get('/edituser', (req, res) => {
  res.sendFile('/Shya/Back-End Web Development/group-exercise-7/edituser.html');
});

// PUT /users/:name endpoint
app.put('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const index = users.findIndex(user => user.name.toLowerCase() === name);
    if (index === -1) {
        res.status(404).json({
            status: "error",
            message: "data tidak ditemukan"
        });
    } else {
        const {id, name} = req.body;
        if (!id || !name) {
            res.status(400).json({
                status: "error",
                message: "data tidak lengkap"
            });
        } else {
            users[index] = {id, name};
            res.json(users);
        }
    }
});

app.get('/deleteuser', (req, res) => {
  res.sendFile('/Shya/Back-End Web Development/group-exercise-7/deluser.html');
});

// DELETE /users/:name endpoint
app.delete('/users/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const index = users.findIndex(user => user.name.toLowerCase() === name);
    if (index === -1) {
        res.status(404).json({
            status: "error",
            message: "data tidak ditemukan"
        });
    } else {
        users.splice(index, 1);
        res.json(users);
    }
});

// Penanganan Routing 404
app.use((req, res, next) => {
    res.status(404).json({
        status: "error",
        message: "resource tidak ditemukan"
    });
});

// Penanganan Error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "terjadi kesalahan pada server"
    });
});

// Jalankan server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});