CREATE OR ALTER PROCEDURE InsertCategory
  @category_id VARCHAR(255),
  @category_name VARCHAR(255),
  @category_description VARCHAR(255),
  @category_image VARCHAR(255)

AS
BEGIN
  INSERT INTO categories (category_id,category_name, category_description,category_image)
  VALUES (@category_id,@category_name, @category_description,@category_image);
END;
