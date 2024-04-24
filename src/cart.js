import { json } from 'express';
import fs, { realpathSync } from 'fs';
import { parse } from 'path';

class Cart {
    constructor(file) {
        this.file = file;
        this.productos = [];
    }

    generateRandomId() {
        return crypto.randomBytes(8).toString('hex');
    }

    async createCart(quantity) {
        await this.readCartFromFile();
        const newCart = {
            cid : this.generateRandomId(),
            quantity: quantity,
            products: []
        };
        this.cart.push(newCart);
        await this.saveCartToFile();
        return newCart;
    }

    async addProductCart(newCartProduct) {
        try {
            let productos = await this.getProductsCart(0);

            const codeExist = productos.some(product => product.code === newCartProduct.code);
            if(codeExist) {
                throw new Error (`El codigo ${newCartProduct} ya esta en uso.`);
            }
            productos.push(newCartProduct);
            await fs.promises.writeFile(this.file, JSON.stringify(productos), 'utf-8');

            return newCartProduct;
        } catch(error) {
            throw new Error(`Error al agregar el nuevo producto: ${error.message}`);
        }
    }

    async getProductsCart(limit) {
        const productos = await fs.promises.readFile(this.file, 'utf-8');
        const parsedProductsCart = await JSON.parse(productos);
        this.productos = parsedProductsCart

        return limit === 0 ? parsedProductsCart: parsedProductsCart.slice(0, limit);
    }

    async getProductsByIdCart(id) {
        const productos = await fs.promises.readFile(this.file, 'utf-8');
        const parsedProductsCart = await JSON.parse(productos);
        this.productos = parsedProductsCart;

        const producto = this.productos.find(producto => producto.id === (id) || {});

        return producto;

    }

    async deleteProductCart(id){
        let productos = await this.getProductsCart(0);
        const index = productos.findIndex(producto => producto => producto.id === id);

        if (index !== -1){
            const deleteProductCart = productos.splice(index,1)[0];
            await fs.promises.writeFile(this.file, JSON.stringify(productos), 'utf-8');
            return deleteProductCart;
        } else {
            return null;
        }
    }
};

export default Cart;

const CartManager = new Cart('src/cart.json');

// const nuevoProducto = {
//     id: 1,
//     name: 'Producto Nuevo',
//     price: 10.99,
//     code: 'ABC123'
// };

// (async () => {
//     try {
//         const productoCreado = await CartManager.addProductCart(nuevoProducto);
//         console.log('Producto creado:', productoCreado);
//     } catch (error) {
//         console.error('Error al crear el producto:', error.message);
//     }
// })();
