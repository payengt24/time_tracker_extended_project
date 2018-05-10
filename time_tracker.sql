CREATE TABLE project (

    "id" serial PRIMARY KEY,
    "project_name" VARCHAR (250) NOT NULL
);

CREATE TABLE history (

    "id" serial PRIMARY KEY,
    "entry" VARCHAR (250),
    "date" DATE,
    "startTime" TIME, 
    "endTime" TIME,
    "project_id" INT references "project" (id)
);



