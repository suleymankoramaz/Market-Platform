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

exports.getAllSales = async (req, res) => {
    try {
        var conn = new sql.ConnectionPool(config);
        conn.connect().then(function () {
            var request = new sql.Request(conn);
            request.execute("SelectAllSales").then(function (recordSet) {
                conn.close();
                res.status(200).json(recordSet.recordset);
            }).catch(function (err) {
                conn.close();
                res.status(500).json({ message: 'Error retrieving sales' });
            });

        }).catch(function (err) {
            console.log(err);
        });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error retrieving sales' });
    }
};

exports.recordSale = async (req, res) => {
    const subDealer_id = req.query.subDealer_id;
    const product_id = req.query.product_id;
    const quantity = req.query.quantity;
    const sale_date = req.query.sale_date;

    try {
        var conn = new sql.ConnectionPool(config);
        await conn.connect();
        var request = new sql.Request(conn);

        const maxIdResult = await request.execute("GetMaxSaleId");
        const maxId = maxIdResult.recordset[0].maxId;
        const newId = (maxId !== null) ? maxId + 1 : 0;

        request.input('product_id', sql.Int, product_id);
        const expirationCheckResult = await request.execute("GetProductExpirationDate");

        const expirationDate = expirationCheckResult.recordset[0].expiration_date;
        if (new Date(expirationDate) < new Date()) {
            conn.close();
            res.status(400).json({ message: 'Product has already expired' });
            return;
        }

        const stockCheckResult = await request.execute("GetProductStock");

        const currentStock = stockCheckResult.recordset[0].stock;
        if (currentStock < quantity) {
            conn.close();
            res.status(400).json({ message: 'Not enough stock for the product' });
            return;
        }

        request.input('id', sql.Int, newId);
        request.input('subDealer_id', sql.NVarChar(255), subDealer_id);
        request.input('quantity', sql.Int, quantity);
        request.input('sale_date', sql.DateTime, sale_date);

        await request.execute("InsertSale");

        

        var request2 = new sql.Request(conn);
        const updatedStock = currentStock - quantity;

        request2.input('product_id', sql.Int, product_id);
        request2.input('updatedStock', sql.Int, updatedStock);
        await request2.execute("UpdateProductStock");

        conn.close();
        res.status(200).json({ message: 'Sale recorded successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error recording sale', error: error.message });
    }
};
