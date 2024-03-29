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
    name: String,
    userId: String
});

var User = mongoose.model('User', {
    username: String,
    password: String
});

var InventoryItem = mongoose.model('InventoryItem',{
    name: String,
    quantity: Number,
    code: String,
    inventoryId: String,
    available: Boolean
});


// Get all invenrtory items
app.get('/api/inventories', function (req, res) {

    console.log("Listing inventory items...");

    //use mongoose to get all inventories in the database
    Inventory.find(function (err, inventories) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(inventories); // return all inventories in JSON format
    });
});

app.get('/api/inventories/:id', function (req, res) {
    console.log("Listing single inventory item...");

    Inventory.find({userId: req.params.id}, function (err, inventories) {
        if (err) {
            res.send(err);
        }

        res.json(inventories);
    });
});

// Create an inventory Item
app.post('/api/inventories', function (req, res) {

    console.log("Creating inventory item...");
    console.log(req.body);

    Inventory.create({
        name: req.body.name,
        userId: req.body.userId,
        done: false
    }, function (err, inventory_items) {
        if (err) {
            res.send(err);
        }

        // create and return all the inventories
        Inventory.find(function (err, inventory_items) {
            if (err)
                res.send(err);
            res.json(inventory_items);
        });
    });

});

// Update an inventory Item
app.put('/api/inventories/:id', function (req, res) {
    const inventory_item = {
        name: req.body.name,
        userId: req.body.userId
    };
    console.log("Updating item - ", req.params.id);
    Inventory.update({_id: req.params.id}, inventory_item, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete an inventory Item
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

app.get('/api/inventories/items/:id', function (req, res) {
    console.log(`Listing items belonging to an inventory ${req.params.id}...`);

    InventoryItem.find({inventoryId: req.params.id}, function (err, inventory_items) {
        if (err) {
            res.send(err);
        }

        res.json(inventory_items);
    });
});

app.get('/api/inventories/items/code/:id', function (req, res) {
    console.log(`Listing item by QR Code ${req.params.id}...`);

    InventoryItem.find({code: req.params.id}, function (err, inventory_items) {
        if (err) {
            res.send(err);
        }

        res.json(inventory_items);
    });
});

app.post('/api/inventories/items', function (req, res) {

    console.log("Creating inventory item...");
    console.log(req.body);

    InventoryItem.create({
        name: req.body.name,
        quantity: req.body.quantity,
        code: req.body.code,
        inventoryId: req.body.inventoryId,
        available: true,
        done: false
    }, function (err, inventory_items) {
        if (err) {
            res.send(err);
        }

        // create and return all the inventories
        InventoryItem.find(function (err, inventory_items) {
            if (err)
                res.send(err);
            res.json(inventory_items);
        });
    });

});

app.put('/api/inventories/items/:id', function (req, res) {
    const inventory_item = {
        name: req.body.name,
        quantity: req.body.quantity,
        code: req.body.code,
        inventoryId: req.body.inventoryId,
        available: req.body.available
    };

    console.log("Updating item - ", req.params.id);

    InventoryItem.update({_id: req.params.id}, inventory_item, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});

app.delete('/api/inventories/items/:id', function (req, res) {
    InventoryItem.remove({
        _id: req.params.id
    }, function (err, grocery) {
        if (err) {
            console.error("Error deleting item ", err);
        }
        else {
            InventoryItem.find(function (err, inventory_items) {
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

app.post('/api/users', function (req, res) {
    console.log("fetching users...");
    User.find({username: req.body.username, password: req.body.password}, function (err, users) {
        if (err) {
            res.send(err);
        }

        res.json(users);
    });
});

app.get('/api/users/:id', function (req, res) {
    console.log("fetching user...");

    User.find({_id: req.params.id}, function (err, users) {
        if (err) {
            res.send(err);
        }

        res.json(users);
    });
});

app.post('/api/addUser', function (req, res) {
    console.log("Creating user...");
    console.log(req.body);

    User.create({
        username: req.body.username,
        password: req.body.password,
        done: false
    }, function (err, users) {
        if (err) {
            res.send(err);
        }

        // create and return all the inventories
        User.find(function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });
});


// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("Inventory server listening on port  - ", (process.env.PORT || 8080));