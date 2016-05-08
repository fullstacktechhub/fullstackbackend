var express = require('express');
var mongoDb = require('mongolab-data-api')('cg1G5GCiREqPytVeVwjldvYAPWFJRv6K');
var crypto = require("crypto-js");
var app = express();

app.set('port', (process.env.PORT || 5000));

mongoDb.listDatabases(function (err, data) {
    if (err) { console.log(err); }
    else {
        console.log(data); // => [db1, db2, db3, ...]
    }
});
mongoDb.listCollections('full_stack_developer_javascript', function (err, collections) {
    console.log(collections); // => [coll1, coll2, ...]
});
var options = {
    database: 'full_stack_developer_javascript',
    collectionName: 'users',
    query: '{ "username": "srinivasa" }'
};
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/user", function(req, res) {
    mongoDb.listDocuments(options, function (err, data) {
        var cipher = crypto.AES.encrypt(data[0].password, "12345678tvr");
        var userData = {"_id":data[0]._id,"username":data[0].username,"password":cipher.toString()};
       
        res.json(userData);
    });

});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
