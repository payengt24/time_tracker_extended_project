var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.post('/addEntry', (req, res) => {
    console.log("reach server router");
    const entry = req.body;
    console.log("in router: ", entry.date);
    pool.query(`INSERT INTO "history" ("entry", "date", "startTime", "endTime", "project_id")
                VALUES ($1, $2, $3, $4, $5)`, [entry.entry, entry.date, entry.startTime.split('T')[1].split('.')[0], entry.endTime.split('T')[1].split('.')[0], entry.project_id])
         .then((results) => {
            console.log(results.rows);
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('error with POST', error);
            res.sendStatus(500);
        });
})
//router to get project into selector
router.get('/getProject', (req, res) => {
    console.log("Server: getting project list");
    pool.query(`SELECT * FROM "project"`)
    .then((results) => {
        console.log(results.rows);
        res.send(results.rows)
    })
    .catch((error) => {
        console.log('error with get', error);
        res.sendStatus(500);
    });
})


router.get('/getEntry', (req, res) => {
    pool.query(`SELECT P."project_name", H."entry", H."date", H."startTime", h."endTime",
                    EXTRACT(HOUR FROM (H."endTime" - H."startTime")) AS hours, 
                    EXTRACT(MINUTE FROM (H."endTime" - H."startTime")) as minutes
                FROM project AS P
                INNER JOIN history AS H ON H.project_id = P.id
                ORDER BY P.project_name
                `)
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('error with gET', error);
            res.sendStatus(500);
        });
});


module.exports = router;