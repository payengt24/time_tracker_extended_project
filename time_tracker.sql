CREATE TABLE project (

    "id" serial PRIMARY KEY,
    "project_name" VARCHAR (250) NOT NULL
);

CREATE TABLE history (

    "id" serial PRIMARY KEY,
    "entry" VARCHAR (250) NOT NULL,
    "date" DATE NOT NULL,
    "startTime" TIME NOT NULL, 
    "endTime" TIME NOT NULL,
    "hour" REAL NOT NULL,
    "project_id" INT references "project" (id) NOT NULL
);



