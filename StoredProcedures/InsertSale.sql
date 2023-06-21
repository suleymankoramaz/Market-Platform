CREATE PROCEDURE InsertSale
    @id INT,
    @subDealer_id INT,
    @product_id INT,
    @quantity INT,
    @sale_date DATETIME
AS
BEGIN
    INSERT INTO sale (id, subDealer_id, product_id, quantity, sale_date)
    VALUES (@id, @subDealer_id, @product_id, @quantity, @sale_date);
END;