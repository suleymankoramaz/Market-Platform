CREATE PROCEDURE InsertProduct
    @id INT,
    @name NVARCHAR(255),
    @stock INT,
    @expiration_date DATETIME
AS
BEGIN
    INSERT INTO product (id, name, stock, expiration_date)
    VALUES (@id, @name, @stock, @expiration_date);
END;