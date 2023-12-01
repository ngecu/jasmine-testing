CREATE OR ALTER PROCEDURE InsertProduct
 @product_id VARCHAR(255),
 @name VARCHAR(255),
 @price DECIMAL(18, 2),
 @discount INT,

 @image VARCHAR(255),
 @category_id VARCHAR(255),
 @countInStock INT,
 @numReviews INT,
 @description TEXT
AS
BEGIN
 SET NOCOUNT ON;


 IF NOT EXISTS (SELECT 1 FROM categories WHERE category_id = @category_id)
 BEGIN

    INSERT INTO categories (category_id)
    VALUES (@category_id);
 END

 IF NOT EXISTS (SELECT 1 FROM products WHERE product_id = @product_id)
 BEGIN

    INSERT INTO products (
      product_id,
      name,
      price,
      discount,
      image,
      category_id,
      countInStock,
      numReviews,
      description
    )
    VALUES (
      @product_id,
      @name,
      @price,
      @discount,
      @image,
      @category_id,
      @countInStock,
      @numReviews,
      @description
    );
 END
 ELSE
 BEGIN
    RAISERROR('The product with product_id %s already exists in the database.', 16, 1, @product_id)
    RETURN;
 END
END;

CREATE PROCEDURE UpdateProduct
    @product_id VARCHAR(255),
    @name VARCHAR(255),
    @image VARCHAR(255),
    @category_id VARCHAR(255),
    @description TEXT,
    @discount INT,
    @price DECIMAL(10, 2),
    @countInStock INT
AS
BEGIN
    UPDATE products
    SET
        name = @name,
        image = @image,
        category_id = @category_id,
        description = @description,
        discount = @discount,
        price = @price,
        countInStock = @countInStock
    WHERE
        product_id = @product_id;

    SELECT * FROM products WHERE product_id = @product_id;
END;

CREATE PROCEDURE GetProductsByCategory
    @category_id VARCHAR(500)
AS
BEGIN
    SELECT *
    FROM products
    WHERE category_id = @category_id;
END;