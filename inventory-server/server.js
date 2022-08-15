// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/inventories");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Model
var Inventory = mongoose.model('Inventory', {
    item: String,
    quantity: Number
});


// Get all grocery items
app.get('/api/inventories', function (req, res) {

    console.log("Listing groceries items...");

    //use mongoose to get all groceries in the database
    Inventory.find(function (err, groceries) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(groceries); // return all groceries in JSON format
    });
});

app.get('/api/inventories/:id', function (req, res) {
    console.log("Listing single inventory item...");

    Inventory.find({_id: req.params.id}, function (err, groceries) {
        if (err) {
            res.send(err);
        }

        res.json(groceries);
    });
});

// Create a grocery Item
app.post('/api/inventories', function (req, res) {

    console.log("Creating inventory item...");
    console.log(req.body);

    Inventory.create({
        item: req.body.item,
        quantity: req.body.quantity,
        done: false
    }, function (err, inventory_items) {
        if (err) {
            res.send(err);
        }

        // create and return all the groceries
        Inventory.find(function (err, inventory_items) {
            if (err)
                res.send(err);
            res.json(inventory_items);
        });
    });

});

// Update a grocery Item
app.put('/api/inventories/:id', function (req, res) {
    const inventory_item = {
        item: req.body.item,
        quantity: req.body.quantity
    };
    console.log("Updating item - ", req.params.id);
    Inventory.update({_id: req.params.id}, inventory_item, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a grocery Item
app.delete('/api/inventories/:id', function (req, res) {
    Inventory.remove({
        _id: req.params.id
    }, function (err, grocery) {
        if (err) {
            console.error("Error deleting item ", err);
        }
        else {
            Inventory.find(function (err, inventory_items) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(inventory_items);
                }
            });
        }
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Inventory server listening on port  - ", (process.env.PORT || 8080));