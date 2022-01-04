var express = require('express');
var cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const type = upload.single('upfile');

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post(
    "/api/fileanalyse",
    type,
    function (req, res) {
        let file = req.file;
        res.send({
            name: file.originalname,
            type: file.mimetype,
            size: file.size
        });
    }
);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
