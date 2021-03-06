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
    pool.query(`SELECT          
                P."project_name",
                P."id",
                COALESCE(SUM (H."hour"), 0) as totalHour
                FROM "history" AS H
                RIGHT JOIN "project" AS P ON P.id = H.project_id 
                GROUP BY P."project_name", P."id"
                ORDER BY P."project_name";
                `)
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('error with POST', error);
            res.sendStatus(500);
        });
});


// router.get('/getHour', (req, res) => {
//     console.log("Server: getting hours list");
//     pool.query(`SELECT "hour FROM "history"`)
//         .then((results) => {
//             console.log(results.rows);
//             res.send(results.rows)
//         })
//         .catch((error) => {
//             console.log('error with get', error);
//             res.sendStatus(500);
//         });
// })

// router.get('/getProject', (req, res) => {
//     console.log('reached getProject in routes project.js')
//     pool.query(`SELECT P."project_name", H."startTime", H."endTime",
//                 EXTRACT(HOUR FROM (H."endTime" - H."startTime")) AS hours, 
//                 EXTRACT(MINUTE FROM (H."endTime" - H."startTime")) AS minutes
//                 INNER JOIN history AS H ON H.project_id = P.id
//                 ORDER BY P.project_name`)
//         .then((results) => {
//             console.log(results.rows);
//             res.send(results.rows)
//         })
//         .catch((error) => {
//             console.log('error with POST', error);
//             res.sendStatus(500);
//         });
// });

router.delete('/:id', (req, res) => {
    console.log('Reached deleteProject Router?')
    const project = req.params.id;
    pool.query(`DELETE FROM "project"
                WHERE "id" = $1;`, [project])
        .then((results) => {
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('error on DELETE route', error);
            res.sendStatus(500);
        })
})



router.put('/saveProject', (req, res) => {
    console.log('reached router saveProject');
    const project = req.body;
    pool.query(`UPDATE "project" 
                SET "project_name" = $1          
                WHERE "id" = $2`, [project.project_name, project.id])
        .then((results) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error with saveProject PUT', error);
            res.sendStatus(500);
        });
})



module.exports = router;