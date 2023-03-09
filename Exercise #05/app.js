const express = require('express');
const morgan = require('morgan');
const users = require('./users.js');

const app = express();

const port = 3000;

app.use(morgan('dev'));
app.use(express.json());

// GET /users - Mengembalikan list data users
app.get('/users', (req, res) => 
{
  res.json(users);
});

// GET /users/:name - Mengembalikan data user sesuai dengan permintaan client
app.get('/users/:name', (req, res) => 
{
  const name = req.params.name.toLowerCase();
  const user = users.find(u => u.name.toLowerCase() === name);

  if (user) 
  {
    res.json(user);
  } else 
  {
    res.status(404).json
    ({
      status: "error",
      message: "Data tidak ditemukan",
    });
  }
});

// Middleware untuk menangani routing 404
app.use((req, res, next) => {
  res.status(404).json({
    status: "error",
    message: "Resource tidak ditemukan",
  });
});

// Middleware untuk menangani error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
  });
});

app.listen(port, () => 
{
  console.log(`Server berjalan di port ${port}`);
});
