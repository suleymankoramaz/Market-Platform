CREATE PROCEDURE UpdateProduct
    @id INT,
    @name NVARCHAR(255),
    @stock INT,
    @expiration_date DATETIME
AS
BEGIN
    UPDATE product
    SET name = @name,
        stock = @stock,
        expiration_date = @expiration_date
    WHERE id = @id;
END;