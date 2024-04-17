import express from 'express';
import ProductManager from './desafio.js'; 

const PORT = 3000;
const app = express();
const MANAGER = new ProductManager('./src/productos.json'); 

app.get('/products', async (req, res) => {

    const limit = +req.query.limit || 0;
    const products = await MANAGER.getProducts(limit);

    res.send({ status: 1, payload: products });
});

app.get('/products/:pid', async (req, res) => {

    const product = await MANAGER.getProductsByid(req.params.pid);
    res.send({ status: 1, payload: product });
});


app.listen(PORT, () => {
    console.log(`Servidor activo en ${PORT}`); 
});