const sql = require('mssql');
const config = {
    server: 'localhost',
    database: 'MarketDB',
    user: 'sulo',
    password: 'Slymn1432.',
    options: {
        trustedConnection: true, // For Windows authentication
        enableArithAbort: true,
        trustServerCertificate: true
    },
};

exports.getAllUniqueCodes = async (req, res) => {
    try {
        var conn = new sql.ConnectionPool(config);
        conn.connect().then(function () {
            var request = new sql.Request(conn);
            request.query("SELECT * FROM uniqueCode").then(function (recordSet) {
                conn.close();
                res.status(200).json(recordSet.recordset);
            }).catch(function (err) {
                conn.close();
                res.status(500).json({ message: 'Error retrieving uniqueCodes' });
            });

        }).catch(function (err) {
            console.log(err);
        });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error retrieving uniqueCodes' });
    }
};

exports.addUniqueCode = async (req, res) => {
    const subDealer_id = req.query.subDealer_id;
    const product_id = req.query.product_id;
    const quantity = req.query.quantity;
  
    try {
        var conn = new sql.ConnectionPool(config);
        await conn.connect();
        var request = new sql.Request(conn);

        // Get the maximum existing ID from the 'product' table
        const maxIdQuery = 'SELECT MAX(id) AS maxId FROM product';
        const maxIdResult = await request.query(maxIdQuery);
        const maxId = maxIdResult.recordset[0].maxId;
        const newId = (maxId !== null) ? maxId + 1 : 0;

        request.input('id', sql.Int, newId);
        request.input('subDealer_id', sql.Int, subDealer_id);
        request.input('product_id', sql.Int, product_id);
        request.input('quantity', sql.Int, quantity);
    
        const result = await request.query("INSERT INTO uniqueCode (id, subDealer_id, product_id, quantity) VALUES (@id, @subDealer_id, @product_id, @quantity)");
        conn.close();
        res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};