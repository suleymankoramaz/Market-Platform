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
            request.query("SELECT * FROM sale").then(function (recordSet) {
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
    const id = req.query.id;
    const subDealer_id = req.query.subDealer_id;
    const product_id = req.query.product_id;
    const quantity = req.query.quantity;
    const sale_date = req.query.sale_date;

    try {
        var conn = new sql.ConnectionPool(config);
        await conn.connect();
        var request = new sql.Request(conn);

        // Check if there is enough stock for the product
        const stockCheckQuery = `SELECT stock FROM product WHERE id = @product_id`;
        request.input('product_id', sql.Int, product_id);
        const stockCheckResult = await request.query(stockCheckQuery);

        const currentStock = stockCheckResult.recordset[0].stock;
        console.log(stockCheckResult.recordset[0]);
        console.log(quantity);
        if (currentStock < quantity) {
            // If there is not enough stock, return an error response
            conn.close();
            res.status(400).json({ message: 'Not enough stock for the product' });
            return;
        }

        // Record the sale
        request.input('id', sql.Int, id);
        request.input('subDealer_id', sql.NVarChar(255), subDealer_id);
        request.input('quantity', sql.Int, quantity);
        request.input('sale_date', sql.DateTime, sale_date);

        const recordSaleQuery = "INSERT INTO sale (id, subDealer_id, product_id, quantity, sale_date) VALUES (@id, @subDealer_id, @product_id, @quantity, @sale_date)";
        await request.query(recordSaleQuery);

        // Update the product stock
        const updatedStock = currentStock - quantity;
        request.input('updatedStock', sql.Int, updatedStock);
        const updateStockQuery = "UPDATE product SET stock = @updatedStock WHERE id = @product_id";
        await request.query(updateStockQuery);

        conn.close();
        res.status(200).json({ message: 'Sale recorded successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error recording sale', error: error.message });
    }
};
