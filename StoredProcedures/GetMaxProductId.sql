CREATE PROCEDURE GetMaxProductId
AS
BEGIN
    SELECT MAX(id) AS maxId FROM product;
END;