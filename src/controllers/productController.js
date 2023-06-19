const sql = require('mssql');

exports.getAllProducts = async (req, res) => {
    try {
        const request = new sql.Request();
        const result = await request.query('SELECT * FROM product');
        res.status(200).json(result.recordset);
    } 
    catch (error) {
         res.status(500).json({ message: 'Error retrieving products' });
    }
};

exports.addProduct = async (req, res) => {
  //adding a product
};

exports.updateProduct = async (req, res) => {
  //updating a product
};

exports.deleteProduct = async (req, res) => {
  //deleting a product
};
