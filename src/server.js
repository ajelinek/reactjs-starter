'use strict';

var express = require('express');
var app = express();

process.env.NODE_ENV = (process.env.NODE_ENV || 'DEV');


//if (process.env.NODE_ENV == 'DEV') {
//    process.chdir(process.cwd() + '/build');
//}

app.use(express.static('build'));

let port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Nod app is running at localhost:" + port);
});
