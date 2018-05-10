var express = require('express');
var router = express.Router();
var pool = require('../modules/pool');

router.post('/addProject', (req, res) => {
    console.log("reach server router");
    const project = req.body;
    console.log("in router: ", project);
    pool.query(`INSERT INTO "project" ("project_name")
                VALUES ($1)`, [project.project_name])
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error with SQL insert on addProject POST', error);
            res.sendStatus(500);
        });
})

router.get('/getProject', (req, res) => {
    console.log('reached getProject in routes project.js')
    pool.query(`SELECT * FROM "project" ORDER BY id `)
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('error with POST', error);
            res.sendStatus(500);
        });
});


module.exports = router;