// implement your API here
const express = require('express');
const db = require('./data/db')

const server = express();

server.use(express.json());

server.post("/api/users", (req, res) =>{
    const body = req.body;
    if(body.name && body.bio){
        db.insert(body)
        .then(() =>{
            res.status(201).json(body);
        })
        .catch(err =>{
            res.status(500).json({
                err: err,
                message: "Error: Could not add user"
            });
        })
    }
    else{
        res.status(400).json({
            message: "Please include a name and bio"
        });
    }
});

server.get('/api/users', (req, res) =>{
    db.find()
    .then(users =>{
        res.json(users);
    })
    .catch(err =>{
        res.status(500).json({
            err: err,
            message: "Could not return users"
        })
    })
})

server.get('/api/users/:id', (req, res) =>{
    const { id } = req.params;

    db.findById(id)
    .then(user =>{
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({
                message: "Invalid User Id"
            })
        }
    })
    .catch(err =>{
        res.status(500).json({
            err: err,
            message: "Error: Could not fetch user"
        });
    })
});

server.delete('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    db.remove(id)
    .then(user =>{
        if(user){
            res.status(200).json(user);
        }
        else{
            res.status(404).json({
                message: "Invalid user ID"
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            err: err,
            message: "Could not delete user"
        })
    })
})

server.put('/api/users/:id', (req, res) =>{
    const { id } = req.params;

    const changes = req.body;

    db.update(id, changes)
    .then(updatedUser =>{
        if(updatedUser){
            res.status(200).json(updatedUser);
        }
        else{
            res.status(404).json({
                message: "Invalid user ID"
            });
        }
    })
    .catch(err =>{
        res.status(500).json({
            err: err,
            message: "Could not update user"
        })
    })
})



server.listen(8000, () =>{
    console.log("Server listening on port 8000");
});