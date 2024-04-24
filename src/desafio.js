import fs from "fs";

class ProductManager {
    constructor(file){
        this.file = file;
        this.products = [];
    }

    async addProduct(newProduct) {
        try {
            // Obtener la lista actual de productos
            let products = await this.getProducts(0);
            
            // Verificar si ya existe un producto con el mismo código
            const codeExist = products.some(product => product.code === newProduct.code);
            if (codeExist) {
                throw new Error(`El código ${newProduct.code} ya está en uso.`);
            }
            
            // Agregar el nuevo producto a la lista
            products.push(newProduct);
            
            // Escribir los productos actualizados en el archivo JSON
            await fs.promises.writeFile(this.file, JSON.stringify(products), 'utf-8');
            
            return newProduct;
        } catch (error) {
            throw new Error(`Error al agregar el nuevo producto: ${error.message}`);
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


        const product = this.products.find(product => product.id === (id)) || {};

        return product;
    }

    async deleteProduct(id) {
        let products = await this.getProducts(0);
        const index = products.findIndex(product => product.id === id);
        
        if (index !== -1) {
            const deletedProduct = products.splice(index, 1)[0];
            await fs.promises.writeFile(this.file, JSON.stringify(products), 'utf-8');
            return deletedProduct;
        } else {
            return null;
        }
    }
};

export default ProductManager;

const MANAGER = new ProductManager('src/productos.json');





