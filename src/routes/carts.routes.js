import {Router} from 'express';
import Cart from '../cart.js';



const router = Router();
const CartManager = new Cart('./src/cart.json');


router.get('/:cid', async (req, res) => {
    try {
        const productCart = await CartManager.getProductsByIdCart(+req.params.cid);
        res.send({ status: 1, payload: productCart });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const quantity = req.body.quantity; 
        if (!quantity) {
            return res.status(400).json({ status: 400, error: 'La cantidad es obligatoria' });
        }
        const addedCart = await CartManager.createCart(quantity);
        return res.status(201).json({ status: 201, message: 'Producto agregado correctamente', product: addedCart });
    } catch (error) {
        
        console.error("Error al crear el carrito:", error);
        res.status(500).json({ status: 500, error: 'Error al crear el carrito', message: error.message });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const product = await CartManager.getProductsByIdCart(pid);
        if (!product) {
            return res.status(404).json({ error: 'El producto no existe' });
        } 
        const cart = await CartManager.getProductsByIdCart(cid);
        const existingProductIndex = cart.products.findIndex(item => String(item.cid) === pid);
        if (existingProductIndex !== -1) {
            cart.products[existingProductIndex].quantity++;
        } else {
            cart.products.push({ pid: pid, quantity: 1 });
        }
        await CartManager.saveCartToFile();
        return res.status(201).json({ status: 201, message: 'Producto agregado al carrito correctamente' });
    } catch (error) {
        console.error('Error al agregar el producto al carrito:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

export default router;