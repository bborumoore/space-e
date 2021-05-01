DROP DATABASE IF EXISTS spacee_db;

CREATE DATABASE spacee_db;

USE spacee_db;

CREATE TABLE space_Launch(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
  id INTEGER AUTO_INCREMENT NOT NULL,
  location VARCHAR(50),
  description VARCHAR(255),
  timezone VARCHAR(50), 
  date  VARCHAR(50),
  StartTime VARCHAR(50),
  EndTime VARCHAR(50),
  PRIMARY KEY (id)
);


