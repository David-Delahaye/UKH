CREATE TABLE site(
    site_id serial PRIMARY KEY,
    site_name VARCHAR (50) NOT NULL,
    descriprion VARCHAR (1000) NOT NULL,
    created_on TIMESTAMP NOT NULL
);