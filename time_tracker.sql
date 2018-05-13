CREATE TABLE project (

    "id" serial PRIMARY KEY,
    "project_name" VARCHAR (250) UNIQUE NOT NULL
);

CREATE TABLE history (

    "id" serial PRIMARY KEY,
    "entry" VARCHAR (250) NOT NULL,
    "date" DATE NOT NULL,
    "startTime" TIME NOT NULL, 
    "endTime" TIME NOT NULL,
    "hour" REAL NOT NULL,
    "project_id" INT references "project" (id) ON DELETE CASCADE NOT NULL
);


SELECT * FROM "project";

SELECT * FROM "history";

--Grouping FOR PROJECT
SELECT          
P."project_name",
P."id",
COALESCE(SUM (H."hour"), 0) as totalHour
FROM "history" AS H
RIGHT JOIN "project" AS P ON P.id = H.project_id 
GROUP BY P."project_name", P."id"
ORDER BY P."project_name";




-- SELECT P.project_name, H.entry, H.date, EXTRACT(HOUR FROM (H."endTime" - H."startTime")) AS hours, EXTRACT(MINUTE FROM (H."endTime" - H."startTime")) as minutes
--                 FROM project AS P
--                 INNER JOIN history AS H ON H.project_id = P.id
--                 ORDER BY P.project_name;

-- SELECT P."project_name", H."entry", H."date", H."startTime", H."endTime", H."id", H."hour"
--                 FROM project AS P
--                 INNER JOIN history AS H ON H.project_id = P.id
--                 ORDER BY P.project_name;


-- SELECT * FROM "project" ORDER BY id;


-- -- SELECT
-- --  project_id,
-- --  SUM (hour)
-- -- FROM
-- --  "history"
-- -- GROUP BY
-- --  project_id;

-- --Grouping for the total SUM in project views
--  SELECT
-- P."project_name",
-- H."project_id",
-- SUM (H."hour")
-- FROM "history" AS H
-- INNER JOIN "project" AS P ON P.id = H.project_id 
-- GROUP BY P."project_name", H."project_id"
-- ORDER BY P."project_name";




                






