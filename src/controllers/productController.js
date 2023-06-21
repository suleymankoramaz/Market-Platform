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

exports.getAllProducts = async (req, res) => {
    try {
        var conn = new sql.ConnectionPool(config);
        await conn.connect();
        var request = new sql.Request(conn);
        const result = await request.execute("SelectAllProducts");
        conn.close();
        res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};

exports.addProduct = async (req, res) => {
    const name = req.query.name;
    const stock = req.query.stock;
    const expiration_date = req.query.expiration_date;
  
    try {
        var conn = new sql.ConnectionPool(config);
        await conn.connect();
        var request = new sql.Request(conn);
    
        const maxIdResult = await request.execute("GetMaxProductId");
        const maxId = maxIdResult.recordset[0].maxId;
        const newId = (maxId !== null) ? maxId + 1 : 0;
    
        request.input('id', sql.Int, newId);
        request.input('name', sql.NVarChar(255), name);
        request.input('stock', sql.Int, stock);
        request.input('expiration_date', sql.DateTime, expiration_date);
        
        await request.execute("InsertProduct");
    
        conn.close();
        res.status(200).json({ id: newId, name, stock, expiration_date });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding product', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const id = req.query.id;
    const name = req.query.name;
    const stock = req.query.stock;
    const expiration_date = req.query.expiration_date;

    try {
        var conn = new sql.ConnectionPool(config);
        await conn.connect();
        var request = new sql.Request(conn);
        
        request.input('id', sql.Int, id);
        request.input('name', sql.NVarChar(255), name);
        request.input('stock', sql.Int, stock);
        request.input('expiration_date', sql.DateTime, expiration_date);
    
        const result = await request.execute("UpdateProduct");
        conn.close();
        res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const id = req.query.id;

    try {
        var conn = new sql.ConnectionPool(config);
        await conn.connect();
        var request = new sql.Request(conn);
        
        request.input('id', sql.Int, id);
    
        const result = await request.execute("DeleteProduct");
        conn.close();
        res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
