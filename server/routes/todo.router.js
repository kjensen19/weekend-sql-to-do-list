const express = require('express');
const toDoRouter = express.Router();


// DB CONNECTION
const db = require('../modules/pool');


// GET
toDoRouter.get('/', (req,res) => {
    let queryText = 'SELECT * FROM "tasks";';
    db.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in routes GET', error)
        res.sendStatus(500);
    })
})

// POST
toDoRouter.post('/', (req, res) => {
    let taskToAdd = req.body;
    console.log('Adding task', taskToAdd);

    let queryText = `INSERT INTO "tasks" ("task", "complete")
                      VALUES ($1, $2);`;
    db.query(queryText, [taskToAdd.task, 'FALSE'])
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log('Error adding new task', error);
        res.sendStatus(500)
    })
})

// PUT


// DELETE

module.exports = toDoRouter;