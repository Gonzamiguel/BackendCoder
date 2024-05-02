import express from 'express';
import handlebars from 'express-handlebars';
import  initSocket  from './initSocket.js';
import config from './config.js';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';
import viewsRoutes from './routes/views.routes.js';


const app = express();

const expressInstance = app.listen(config.PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${config.PORT}`);
});

const socketServer = initSocket(expressInstance);
app.set('socketServer', socketServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine());
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

//Ruta de vistas 
app.use('/', viewsRoutes) 

// Ruta de APIS
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);

//Ruta estatica
app.use('/static', express.static(`${config.DIRNAME}/public`));


