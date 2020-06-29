CREATE TABLE site(
    site_id uuid DEFAULT uuid_generate_v4(),
    site_name VARCHAR (50) NOT NULL,
    description VARCHAR (1000) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    owner_id VARCHAR(50) NOT NULL
);

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR (50) NOT NULL,
    hash VARCHAR (150) NOT NULL,
    salt VARCHAR (150) NOT NULL
);