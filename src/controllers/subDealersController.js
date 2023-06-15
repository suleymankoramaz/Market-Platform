const sql = require('mssql');

exports.getAllSubDealers = async (req, res) => {
  try {
    const request = new sql.Request();
    const result = await request.query('SELECT * FROM SubDealers');
    res.status(200).json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving sub-dealers' });
  }
};

exports.addSubDealer = async (req, res) => {
  // adding a sub-dealer
};