-- TABLE USERS
CREATE TABLE users
(
    user_id VARCHAR NOT NULL PRIMARY KEY,
    user_name VARCHAR(255),
    user_email VARCHAR(255),
    user_phone VARCHAR(255),
    user_password VARCHAR(255),
    user_photo VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recipes
(
    recipe_id VARCHAR PRIMARY KEY,
    recipe_title VARCHAR(255),
    recipe_ingredients VARCHAR(255) ,
    recipe_photo VARCHAR(255),
    recipe_video VARCHAR(255),
    categorys_id VARCHAR,
    users_id VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments
(
    comment_id VARCHAR PRIMARY KEY,
    recipe_id VARCHAR,
    users_id VARCHAR,
    comment_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    category_id VARCHAR PRIMARY KEY,
    category_name VARCHAR(255)
);

CREATE TABLE likeds
(
    liked_id VARCHAR PRIMARY KEY,
    recipe_id VARCHAR,
    users_id VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE bookmarks
(
    bookmark_id VARCHAR PRIMARY KEY,
    recipe_id VARCHAR,
    users_id VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
