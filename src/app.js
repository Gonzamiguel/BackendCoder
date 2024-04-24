import express from 'express';
import config from './config.js';
import productsRoutes from './routes/products.routes.js';
import cartRoutes from './routes/carts.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/static', express.static(`${config.DIRNAME}/public`));

app.listen(config.PORT, () => {
    console.log(`Servidor activo en ${config.PORT}`);
});
