CREATE OR ALTER PROCEDURE InsertUser
    @user_id VARCHAR(50),
    @name VARCHAR(100),
    @email VARCHAR(100),
    @password VARCHAR(100)
    
    
AS
BEGIN
    DECLARE @role INT;

    IF NOT EXISTS (SELECT 1 FROM users)
    BEGIN

        SET @role = 1;
    END
    ELSE
    BEGIN

        SET @role = 0;
    END

    INSERT INTO users(user_id, name, email, password, role)
    VALUES(@user_id, @name, @email,  @password, @role)
END


CREATE OR ALTER PROCEDURE loginUser(@email VARCHAR(200), @password VARCHAR(200))
AS
BEGIN

    SELECT * FROM users WHERE email= @email

END
