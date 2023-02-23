// const http = require('http');

// const datamember = require("./members.js");
// const datauser = require("./users.js");

// const moment = require("moment");

// const server = http.createServer
// ((req, res) => 
//     {
//         const url = req.url;
//         res.statusCode = 200;

//         if (url === "/")
//         {
//             res.setHeader('Content-Type', 'text/plain');
//             res.write("This is the home page");
//         } 

//         else if (url === "/about") 
//         {
//             res.setHeader('Content-Type', 'text/plain');
//             res.write
//             (
//                 JSON.stringify
//                 (
//                     {
//                         status: "success",
//                         message: "response success",
//                         description: "Exercise #03",
//                         date:moment().format(),
//                         data: datamember,
//                     }
//                 )
//             );
//         } 

//         else if(url === "/users") 
//         {
//             res.setHeader("conten-type", "text/json");
//             res.write(JSON.stringify(datauser));
//         }   res.end();
//     }
// )

// const hostname = '127.0.0.1'; 
// // atau localhost

// const port = 3000;

// server.listen
// (port, hostname, () => 
//     {
//         console.log(`Server running at http://${hostname}:${port}/`);
//     }
// );

const express = require("express");

const app = express();
const port = 3000;
const datamember = require("./members.js");
const datauser = require("./users.js");

const moment = require("moment");

app.get("/", (req, res) => res.send("This is the home page"));
app.get
("/about", (req, res) => res.json
    (
        {
            status: "success",
            message: "response success",
            description: "Exercise #04",
            date:moment().format(),
            data: datamember,
        }
    )
);

app.get("/users", (req, res) => res.Json(datauser));
app.listen
(port, () =>
    console.log(`Server running at https://localhost:$(port)`)
)



