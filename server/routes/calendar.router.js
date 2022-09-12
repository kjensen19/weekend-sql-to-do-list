const express = require('express');
const calendarRouter = express.Router();


// DB CONNECTION
const db = require('../modules/pool');

//GET taking month and year as query data
calendarRouter.get('/', (req, res) => {
    console.log('req.query', req.query.month)
    let month = req.query.month
    let year = req.query.year
    //SQL query to select the desired month
    let queryText = `
    SELECT * FROM calendar
      WHERE month=$1 AND year=$2
      ORDER BY id;`
    let queryVals = [month, year]
  
    
    db.query(queryText, queryVals).then(result => {
        console.log('in calendar get', result.rows)
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in calendar router GET', error)
        res.sendStatus(500)
    })
})


// //POST Unused
// calendarRouter.post('/', (req, res) => {
//     console.log('SS PUT to add task: ', req.body)
//     //SQL to insert tasks
//     const sqlQuery = `
//         INSERT INTO "tasks"
//         (task, target)
//         VALUES
//         ($1, $2);
//     `
//     const sqlValues = [req.body.task, req.body.date]

//     db.query(sqlQuery, sqlValues)
//         .then((dbRes) => {
//             res.sendStatus(201)
//         })
//         .catch((dbErr) => {
//             console.log(`Error in PUT, ${dbErr}`)
//             res.sendStatus(500)
//         })
// })


module.exports = calendarRouter;