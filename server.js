var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// {"name":"IAccessible2.au3","type":"application/octet-stream","size":20713}

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    res.send({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port);
});
