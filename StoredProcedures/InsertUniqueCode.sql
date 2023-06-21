CREATE PROCEDURE InsertUniqueCode
    @id INT,
    @subDealer_id INT,
    @product_id INT,
    @quantity INT
AS
BEGIN
    INSERT INTO sale (id, subDealer_id, product_id, quantity)
    VALUES (@id, @subDealer_id, @product_id, @quantity);
END;