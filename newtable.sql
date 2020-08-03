CREATE TABLE site(
    site_id uuid DEFAULT uuid_generate_v4(),
    site_name VARCHAR (50) NOT NULL,
    description VARCHAR (5000) NOT NULL,
    created_on TIMESTAMP NOT NULL,
    owner_id VARCHAR(50) NOT NULL,
    image_link VARCHAR(200),
    shop_link VARCHAR(200),
    average_score INT,
    price INT NOT NULL,
    tags text[] NOT NULL DEFAULT '{}'
);

-- price
-- shop link
-- care tips


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