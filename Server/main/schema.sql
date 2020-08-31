CREATE TABLE users (
    uid SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE,
        email VARCHAR(255),
        email_varified BOOLEAN,
        date_created DATE,
        last_login DATE
);

CREATE TABLE posts (
    pid SERIAL PRIMARY KEY,
    title VARCHAR(255),
    body VARCHAR,
    search_vector TSVECTOR,
    user_id INT REFERENCES user(uid),
    author VARCHAR REFERENCES users(username),
    date_created TIMESTAMP,
    like_user_id
);

CREATE TABLE comments (
    cid SERIAL PRIMARY KEY,
    comments VARCHAR(255),
    author  VARCHAR REFERENCES users(username),
    user_id INT REFERENCES users(uid),
    post_id INT REFERENCES posts(pid),
    date_created TIMESTAMP
    
);