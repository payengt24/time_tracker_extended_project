var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.post('/addEntry', (req, res) => {
    console.log("reach server router");
    const entry = req.body;
    console.log("Object Data POST: ", entry);
    pool.query(`INSERT INTO "history" ("entry", "date", "startTime", "endTime", "hour", "project_id")
                VALUES ($1, $2, $3, $4, $5, $6)`, [entry.entry, entry.date, entry.startTime, entry.endTime, entry.hour, entry.project_id])
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
    pool.query(`SELECT P."project_name", H."entry", H."date", H."startTime", H."endTime", H."id", H."hour"
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

router.delete('/:id', (req, res) => {
    console.log('Reached deleteEntry Router?')
    const history = req.params.id;
    console.log(history)
    pool.query(`DELETE FROM "history"
                WHERE "id" = $1;`, [history])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('error on DELETE route', error);
            res.sendStatus(500);
        })
})

router.put('/saveHistory', (req, res) => {
    console.log('reached router saveHistory');
    const history = req.body;
    console.log('my history', history)
    pool.query(`UPDATE "history" 
                SET "entry" = $1, "date" = $2, "startTime" = $3, "endTime" = $4, "hour" = $5         
                WHERE "id" = $6`, [history.entry, history.date, history.startTime, history.endTime, history.hour, history.id])
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error with saveHistory PUT router', error);
            res.sendStatus(500);
        });
})


module.exports = router;