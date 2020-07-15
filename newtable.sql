CREATE TABLE site(
    site_id uuid DEFAULT uuid_generate_v4(),
    site_name VARCHAR (50) NOT NULL,
    description VARCHAR (1000) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    owner_id VARCHAR(50) NOT NULL,
    average_score VARCHAR(50),
    tags text[] NOT NULL DEFAULT '{}'
);

CREATE TABLE users(
    user_id uuid DEFAULT uuid_generate_v4(),
    username VARCHAR (50) NOT NULL,
    hash VARCHAR (150) NOT NULL,
    salt VARCHAR (150) NOT NULL
);

CREATE TABLE comments(
    comment_id uuid DEFAULT uuid_generate_v4(),
    comment_title VARCHAR (50) NOT NULL,
    comment_description VARCHAR (1000) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    owner_id VARCHAR(50) NOT NULL,
    site_id VARCHAR(50) NOT NULL
);

CREATE TABLE site_tags(
    site_id VARCHAR(50) NOT NULL,
    tag VARCHAR(50) NOT NULL,
);