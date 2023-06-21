CREATE PROCEDURE GetMaxUniqueCodeId
AS
BEGIN
    SELECT MAX(id) AS maxId FROM uniqueCode;
END;