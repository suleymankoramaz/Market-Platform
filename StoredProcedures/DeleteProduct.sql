CREATE PROCEDURE DeleteProduct
    @id INT
AS
BEGIN
    DELETE FROM product
    WHERE id = @id;
END;