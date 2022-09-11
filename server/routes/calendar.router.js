const express = require('express');
const calendarRouter = express.Router();


// DB CONNECTION
const db = require('../modules/pool');

//GET
calendarRouter.get('/', (req, res) => {
    let queryText = `
        SELECT * FROM "calendar"
        WHERE "month"='September' AND "year"='2022'
        ORDER BY "id";`

    let secondQuery = `
        SELECT * FROM "tasks"
        WHERE "target"='09%'
    `
    db.query(queryText).then(result => {
        console.log(result.rows)
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in calendar router GET', error)
        res.sendStatus(500)
    })
})


//PUT
calendarRouter.put('/', (req, res) => {
    // let dateToUpdate = req.params.dateToUpdate;
    console.log('SS PUT to add task: ', req.body)
    // to_char(target, 'MM-DD-YYYY') AS target FROM tasks;";
    const sqlQuery = `
        INSERT INTO "tasks"
        (task, target)
        VALUES
        ($1, $2;
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
// POST
// toDoRouter.post('/', (req, res) => {
//     let taskToAdd = req.body;
//     console.log('Adding task', taskToAdd);

//     let queryText = `INSERT INTO "tasks" ("task", "complete", "target")
//                       VALUES ($1, $2, $3)`;
//     db.query(queryText, [taskToAdd.task, 'FALSE', taskToAdd.date])
//     .then(result => {
//         res.sendStatus(201);
//     })
//     .catch(error => {
//         console.log('Error adding new task', error);
//         res.sendStatus(500)
//     })
// })

// PUT
// toDoRouter.put('/:idToUpdate', (req, res) => {
//     let taskMarkedComplete = req.params.idToUpdate;

//     const sqlQuery = `
//         UPDATE "tasks"
//         SET "complete"=TRUE
//         WHERE "id"=$1;
//     `

//     const sqlValues = [taskMarkedComplete]

//     db.query(sqlQuery, sqlValues)
//     .then((dbRes) => {
//         res.sendStatus(200)
//     })
//     .catch((dbErr) => {
//         console.log('Error in PUT')
//         res.sendStatus(500)
//     })
// })

// // DELETE
// toDoRouter.delete('/:idToDelete', (req, res) => {
//     console.log(req.params)
//     taskId = req.params.idToDelete

//     const sqlQuery = `
//         DELETE FROM "tasks"
//         WHERE "id"=$1
//     `

//     const sqlValues = [taskId]

//     db.query(sqlQuery, sqlValues)
//         .then((dbRes) => {
//             res.sendStatus(200);
//         })
//         .catch((dbErr) => {
//             console.log('DELETE ROUTE is on FIRE SS')
//         })
// })

module.exports = calendarRouter;