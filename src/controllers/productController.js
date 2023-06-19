const sql = require('mssql');
const config = {
    server: 'localhost',
    database: 'MarketDB',
    user: 'sulo',
    password: 'Slymn1432.',
    port: 1433,
    options: {
        trustedConnection: true, // For Windows authentication
        enableArithAbort: true,
        trustServerCertificate: true
    },
};

exports.getAllProducts = async (req, res) => {
    try {
        var conn = new sql.ConnectionPool(config);
        conn.connect().then(function () {
            var request = new sql.Request(conn);
            request.query("SELECT * FROM product").then(function (recordSet) {
                conn.close();
                res.status(200).json(recordSet.recordset);
            }).catch(function (err) {
                conn.close();
                res.status(500).json({ message: 'Error retrieving products' });
            });

        }).catch(function (err) {
            console.log(err);
        });
    } 
    catch (error) {
        res.status(500).json({ message: 'Error retrieving products' });
    }
};

exports.addProduct = async (req, res) => {
    const id = req.query.id;
    const name = req.query.name;
    const stock = req.query.stock;
    const expiration_date = req.query.expiration_date;

    console.log(id);
    console.log(name);
    console.log(stock);
    console.log(expiration_date);
  
    try {
      var conn = new sql.ConnectionPool(config);
      await conn.connect();
      var request = new sql.Request(conn);
      
      request.input('id', sql.Int, id);
      request.input('name', sql.NVarChar(255), name);
      request.input('stock', sql.Int, stock);
      request.input('expiration_date', sql.DateTime, expiration_date);
  
      const result = await request.query("INSERT INTO product (id, name, stock, expiration_date) VALUES (@id, @name, @stock, @expiration_date)");
      conn.close();
      res.status(200).json(result.recordset);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error adding product', error: error.message });
    }
  };

exports.updateProduct = async (req, res) => {
    //updating a product
};

exports.deleteProduct = async (req, res) => {
    //deleting a product
};
