const express = require('express');
const toDoRouter = express.Router();


// DB CONNECTION
const db = require('../modules/pool');


// GET with date data
toDoRouter.get('/', (req,res) => {
    let minDate = req.query.minDate
    let maxDate = req.query.maxDate
    //console.log('mindate =', minDate)
    //SQL to select task data and convert date format for target date
    let queryText = `
    SELECT id, task, complete, target, to_char(target, 'MM-DD-YYYY') AS target FROM tasks
      WHERE target between $1 and $2
      ORDER BY id ASC;
    `;
    let queryVals = [minDate, maxDate]
    //console.log(`in todo GET ${queryVals}`)
    db.query(queryText, queryVals).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in routes GET', error)
        res.sendStatus(500);
    })
})

// POST
// //POST Unused
toDoRouter.post('/', (req, res) => {
    //console.log('SS PUT to add task: ', req.body)
    //SQL to insert tasks
    const sqlQuery = `
        INSERT INTO "tasks"
        (task, target)
        VALUES
        ($1, $2);
    `
    const sqlValues = [req.body.task, req.body.date]

    db.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201)
        })
        .catch((dbErr) => {
            console.log(`Error in PUT, ${dbErr}`)
            res.sendStatus(500)
        })
})

// PUT
toDoRouter.put('/:dateTo', (req, res) => {
    let taskMarkedComplete = req.params.dateTo;

    const sqlQuery = `
        UPDATE "tasks"
        SET "complete"=TRUE
        WHERE "id"=$1;
    `

    const sqlValues = [taskMarkedComplete]

    db.query(sqlQuery, sqlValues)
    .then((dbRes) => {
        res.sendStatus(200)
    })
    .catch((dbErr) => {
        console.log('Error in PUT')
        res.sendStatus(500)
    })
})

// DELETE
toDoRouter.delete('/:idToDelete', (req, res) => {
    //console.log(req.params)
    taskId = req.params.idToDelete

    const sqlQuery = `
        DELETE FROM "tasks"
        WHERE "id"=$1
    `

    const sqlValues = [taskId]

    db.query(sqlQuery, sqlValues)
        .then((dbRes) => {
            res.sendStatus(200);
        })
        .catch((dbErr) => {
            console.log('DELETE ROUTE is on FIRE SS')
        })
})
module.exports = toDoRouter;