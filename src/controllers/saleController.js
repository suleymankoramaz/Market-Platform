const sql = require('mssql');

exports.getAllSales = async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM sale');
        res.status(200).json(result.recordset);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error retrieving sales' });
    }
};

exports.recordSale = async (req, res) => {
  // recording a sale
};