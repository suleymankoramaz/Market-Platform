CREATE PROCEDURE GetProductStock
    @product_id INT
AS
BEGIN
    SELECT stock
    FROM product
    WHERE id = @product_id;
END;