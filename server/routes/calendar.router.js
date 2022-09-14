const express = require('express');
const calendarRouter = express.Router();


// DB CONNECTION
const db = require('../modules/pool');

//GET taking month and year as query data
calendarRouter.get('/', (req, res) => {
    //console.log('req.query', req.query.month)
    let month = req.query.month
    let year = req.query.year
    //SQL query to select the desired month
    let queryText = `
    SELECT * FROM calendar
      WHERE month=$1 AND year=$2
      ORDER BY id;`
    let queryVals = [month, year]
  
    
    db.query(queryText, queryVals).then(result => {
        //console.log('in calendar get', result.rows)
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in calendar router GET', error)
        res.sendStatus(500)
    })
})


module.exports = calendarRouter;