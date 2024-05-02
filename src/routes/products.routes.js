import { Router } from 'express';
import ProductManager from '../desafio.js';
import crypto from 'crypto';
import { uploader } from '../uploader.js';
import fs from 'fs';

const router = Router();
const MANAGER = new ProductManager('./src/productos.json');



router.get('/', async (req, res) => {
    try {
        const limit = +req.query.limit || 0;
        const products = await MANAGER.getProducts(limit);
        res.send({ status: 1, payload: products });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await MANAGER.getProductsByid(req.params.pid);
        res.send({ status: 1, payload: product });
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/create', uploader.array('thumbnails', 4), async (req, res) => {
    try {
        const { title, description, price, code, stock } = req.body;
        const thumbnails = req.files.map(file => file.filename);
        
        if (!title || !description || !price || !code || !stock) {
            return res.status(400).json({ error: "Faltan campos obligatorios en la solicitud" });
        }
        
        const randomId = () => {
            return crypto.randomBytes(8).toString('hex');
        }

        const FreshProduct = {
            id: randomId(),
            title,
            description,
            price,
            code,
            stock,
            thumbnails
        };

        const AppendProduct = await MANAGER.addProduct(FreshProduct);
        return res.status(201).json({ status: 201, message: `El producto con id: ${FreshProduct.id} fue agregado correctamente`, product: AppendProduct });
    } catch (error) {
        console.error('Error al agregar un nuevo producto:', error);
        res.status(500).json({ error: 'Error interno del servidor al agregar un nuevo producto' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const productId = req.params.pid;
        const updatedProductData = req.body;

        let products = await MANAGER.getProducts(0);
        const index = products.findIndex(product => product.id === productId);

        if (index === -1) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        Object.keys(updatedProductData).forEach(key => {
            if (key !== 'id') {
                products[index][key] = updatedProductData[key];
            }
        });

        await fs.promises.writeFile(MANAGER.file, JSON.stringify(products), 'utf-8');

        return res.json({ status: 200, message: `Producto con ID ${productId} actualizado correctamente`, product: products[index] });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error interno del servidor al actualizar el producto', details: error.message });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const deleteProducts = await MANAGER.deleteProduct(pid);
        
        if (deleteProducts) {
            res.status(200).send({ status: 200, payload: deleteProducts, message: `Producto con el id: ${pid} eliminado correctamente` });
        } else {
            res.status(404).send({ status: 404, error: `Producto con el id: ${pid} no encontrado` });
        }
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).send({ status: 500, error: 'Error interno del servidor al eliminar el producto' });
    }
});

export default router;
