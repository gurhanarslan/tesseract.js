
var http = require("http");
var express = require("express")
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
const path = require('path')
var config = require('./config')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({ origin: true, credentials: true }));
const fileUpload = require('express-fileupload')
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'jade');
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(function (req, res, next) {
    //izinler için....//ÜÇ
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Token, token");
    res.header("Access-Control-Allow-Headers", "*");

    res.header("*");
    //res.header('Access-Control-Allow-Headers', '*,access-token, secret-key');
    res.header("Access-Control-Allow-Credentials", true);
    next();
    //Authorization,X-Requested-With,content-type, Origin, Accept, application/x-www-form-urlencoded, multipart/form-data
    //'Origin','X-Requested-With','contentType','Content-Type','Accept','Authorization'
});


app.set('secretKey', config.api_secret_key)
// parse application/json
app.use(bodyParser.json())
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
app.patch('/', async function (req, res) {
    
    const Tesseract = require('./src/helpers/Tesseract')
    const createImage = require('./src/helpers/createImage')
    if (req.files.image) {
        const image = req.files.image;
        const hash = uuidv4();
        const path = `public/images/${hash}.jpeg`;
        image.mv(path);
        const text = await Tesseract(`${hash}.jpeg`);

        res.json({
            message: 'OK',
            text: text,
            imageUrl: `/images/${hash}.jpeg`
        })
    } else {
        res.json({
            message: 'ERRORNOIMAGE'
        })
    }
})


var server = app.listen(3001, "127.0.0.1", function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});

// var server = app.listen(4001, function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log("Example app listening at http://%s:%s", host, port)
// });
