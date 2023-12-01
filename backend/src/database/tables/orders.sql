CREATE TABLE orders (
    order_id VARCHAR(36) PRIMARY KEY,
    product_id VARCHAR(255) ,
    
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email_address VARCHAR(100),
    cartItemsPrice DECIMAL(10, 2) NOT NULL,
    shippingPrice DECIMAL(10, 2) NOT NULL,
    taxPrice DECIMAL(10, 2) NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    shippingAddress VARCHAR(255),
    receipt VARCHAR(255) NOT NULL,
    user_id VARCHAR(500),
    is_paid INT NOT NULL DEFAULT 0,
    paid_at VARCHAR(255),
    is_delivered INT  DEFAULT 0,
    delivered_at VARCHAR(255),
    created_at VARCHAR(255),

    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
);