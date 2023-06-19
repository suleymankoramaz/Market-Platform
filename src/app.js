const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productsRoutes = require('./routes/productRoutes');
const subDealersRoutes = require('./routes/subDealerRoutes');
const uniqueCodesRoutes = require('./routes/uniqueCodeRoutes');
const salesRoutes = require('./routes/saleRoutes');

const app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");
    
    var config = {
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

    function listProducts() {
        var conn = new sql.ConnectionPool(config);
        conn.connect().then(function () {
            var request = new sql.Request(conn);
            request.query("SELECT * FROM product").then(function (recordSet) {
                console.log(recordSet.recordset);
                conn.close();
            }).catch(function (err) {
                console.log(err);
                conn.close();
            });

            request.query("SELECT * FROM subDealer").then(function (recordSet) {
                console.log(recordSet.recordset);
                conn.close();
            }).catch(function (err) {
                console.log(err);
                conn.close();
            });
        }).catch(function (err) {
            console.log(err);
        });
    }
    
    listProducts();
});


app.use(bodyParser.json());
app.use(cors());

app.use('/product', productsRoutes);
app.use('/sub-dealer', subDealersRoutes);
app.use('/unique-code', uniqueCodesRoutes);
app.use('/sale', salesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});