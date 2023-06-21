const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productsRoutes = require('./routes/productRoutes');
const subDealersRoutes = require('./routes/subDealerRoutes');
const uniqueCodesRoutes = require('./routes/uniqueCodeRoutes');
const salesRoutes = require('./routes/saleRoutes');

const app = express();

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