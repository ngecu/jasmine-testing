drop TABLE products
 

CREATE TABLE products (
    product_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(18, 2),
    discount INT,
    image VARCHAR(255),
    category_id VARCHAR(500),
    countInStock INT,
    numReviews INT,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);