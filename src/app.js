import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import config from './config.js';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';
import viewsRoutes from './routes/views.routes.js';


const app = express();

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


const httpServer = app.listen(config.PORT, () => {
    console.log(`Servidor activo en ${config.PORT}`);
});

const socketServer = new Server(httpServer);
socketServer.on('connection', client => {
    console.log(`Cliente conectado, id ${client.id} desde ${client.handshake.address}`);

    client.on('newMessage', data => {
        console.log(`Mensaje recibido desde ${client.id} : ${data}`);
        client.emit('newMessageConfirmation', 'Ok');
    })
});
