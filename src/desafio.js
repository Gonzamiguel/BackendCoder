import { json } from "express";
import fs from "fs";

class ProductManager {
    constructor(file){
        this.file = file;
        this.products = [];
    }

    async addProduct(newProduct) {
        const codeExist = this.products.some(product => product.code === newProduct.code);
        if(!codeExist){
            newProduct.id = this.products.length + 1;
            this.products.push(newProduct);
            await fs.promises.writeFile(this.file, JSON.stringify(this.products), 'utf-8');
        } else {
            console.log(`El codigo ya existe (${newProduct.code})`);
        }
    } 
    
    async getProducts(limit) {
        const products = await fs.promises.readFile(this.file, 'utf-8');
        const parsedProducts = await JSON.parse(products);
        this.products = parsedProducts

        return limit === 0 ? parsedProducts: parsedProducts.slice(0, limit);
    }

    
    async getProductsByid(id) {

        const products = await fs.promises.readFile(this.file,'utf-8');
        const parsedProducts = await JSON.parse(products);
        this.products = parsedProducts ;


        const product = this.products.find(product => product.id === +id) ||  {};
        return product;
    }
};

export default ProductManager;

const MANAGER = new ProductManager('src/productos.json');





