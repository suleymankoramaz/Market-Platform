const sql = require('mssql');

const sqlConfig = {
    user: 'sk',
    password: 'sk',
    server: 'MSSQLSERVER01',
    database: 'MarketDB',
    options: {
        trustedConnection: true, // For Windows authentication
        enableArithAbort: true,
    },
};

async function testDatabaseIsEmpty() {
  try {
    const pool = await sql.connect(sqlConfig);

    const result = await pool.request().query('SELECT COUNT(*) AS rowCount FROM product');
    const rowCount = result.recordset[0].rowCount;

    if (rowCount === 0) {
      console.log('The database is empty.');
    } else {
      console.log(`The database contains ${rowCount} records.`);
    }

    sql.close();
  } catch (err) {
    console.error('Error:', err);
  }
}

testDatabaseIsEmpty();