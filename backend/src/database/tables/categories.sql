CREATE TABLE categories (
    category_id VARCHAR(500) PRIMARY KEY,
    category_name VARCHAR(255) UNIQUE NOT NULL,
    category_image VARCHAR(255) UNIQUE NOT NULL,

    category_description VARCHAR(255)  NOT NULL,
);
