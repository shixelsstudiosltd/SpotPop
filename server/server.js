// DEPENDENCIES
// ============
var express = require("express"),
    http = require("http"),
    port = (process.env.PORT || 8001),
    server = module.exports = express();



// SERVER CONFIGURATION
// ====================
server.configure(function () {

    server.use(express["static"](__dirname + "/../public"));
    server.use(express.errorHandler({

        dumpExceptions:true,

        showStack:true

    }));

    server.use(express.bodyParser());

    server.use(server.router);
});



http.createServer(server).listen(port); 
