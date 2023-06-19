const sql = require('mssql');

exports.getAllUniqueCodes = async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM uniqueCode');
        res.status(200).json(result.recordset);
    } 
    catch (error) {
        res.status(500).json({ message: 'Error retrieving unique codes' });
    }
};

exports.addUniqueCode = async (req, res) => {
  // adding a unique code
};