/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "Users" 
(
    "id" UUID NOT NULL ,
    "credit" FLOAT NOT NULL, 
    "email" VARCHAR(255) NOT NULL UNIQUE, 
    "lat" FLOAT NOT NULL, 
    "long" FLOAT NOT NULL, 
    "role" VARCHAR(255) NOT NULL,
    PRIMARY KEY ("id")
);

ALTER TABLE public."Users"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS "Vehicles" 
(
    "id" UUID NOT NULL , 
    "id_vehicle" INTEGER NOT NULL UNIQUE, 
    "type" VARCHAR(255) NOT NULL, 
    "lat" FLOAT NOT NULL, 
    "long" FLOAT NOT NULL, 
    "nol" BOOLEAN NOT NULL, 
    PRIMARY KEY ("id")
);

ALTER TABLE public."Vehicles"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS "Parkings" 
(
    "id" UUID NOT NULL ,
    "lat" FLOAT NOT NULL, 
    "long" FLOAT NOT NULL, 
    PRIMARY KEY ("id")
);

ALTER TABLE public."Parkings"
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS "Rentals" 
(
    "id" UUID NOT NULL ,
    "email" VARCHAR(255) NOT NULL, 
    "payment" FLOAT, 
    "start" FLOAT NOT NULL, 
    "end" FLOAT, 
    "id_vehicle" INTEGER NOT NULL, 
    "type_vehicle" VARCHAR(255) NOT NULL, 
    PRIMARY KEY ("id")
);

ALTER TABLE public."Rentals"
    OWNER to postgres;
