CREATE PROCEDURE UpdateProductStock
    @product_id INT,
    @updatedStock INT
AS
BEGIN
    UPDATE product
    SET stock = @updatedStock
    WHERE id = @product_id;
END;