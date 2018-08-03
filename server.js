const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const products = require('./routes/products');
const cart = require('./routes/cart');

const PORT = process.env.PORT || 3010;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('smoke test!');
});


app.use('/users', users);
app.use('/products', products);
app.use('/cart', cart);

app.listen(PORT, ()=>{
  process.stdout.write(`server is running on PORT: ${PORT}`);
});