const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({dest:'./upload-file/'});
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('/Shya/Back-End Web Development/upload-file/index.html');
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send('file uploaded')
});

app.listen(3000, () => console.log('server started'));
