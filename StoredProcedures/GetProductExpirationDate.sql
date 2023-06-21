CREATE PROCEDURE GetProductExpirationDate
    @product_id INT
AS
BEGIN
    SELECT expiration_date
    FROM product
    WHERE id = @product_id;
END;