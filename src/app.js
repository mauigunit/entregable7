import express from 'express';
import expHandlebars from 'express-handlebars';
import prodRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';

const app = express();

//const { Server } = require('socket.io');

//const productsViewsRouter = require('../views/routes/products');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', expHandlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');
//app.use(express.static('public'));


app.use('/api/products', prodRouter);
app.use('/api/carts', cartRouter);


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`);
});
server.on('error', error => console.log(error));
