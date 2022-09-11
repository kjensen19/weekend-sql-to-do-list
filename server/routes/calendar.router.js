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
    db.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in calendar router GET', error)
        res.sendStatus(500)
    })
})

module.exports = calendarRouter;