const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productsRoutes = require('./routes/productsRoutes');
const subDealersRoutes = require('./routes/subDealersRoutes');
const uniqueCodesRoutes = require('./routes/uniqueCodesRoutes');
const salesRoutes = require('./routes/salesRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/products', productsRoutes);
app.use('/sub-dealers', subDealersRoutes);
app.use('/unique-codes', uniqueCodesRoutes);
app.use('/sales', salesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});