import fs from 'fs';


class ProductManager{

    ruta;

    constructor(ruta){
        this.ruta = ruta;
        this.products = []
    }

    async getProducts(){        
        
        try{
        const products = await fs.promises.readFile(this.ruta, 'utf-8');
        // console.log(JSON.parse(products));
        return JSON.parse(products);
        }catch(error){
            console.log(error);;
        }
    }

    async idIncrement(){
        let product = await this.getProducts()
        
        try {
            return product.length + 1;
        } catch (error) {
            console.log(error);
        }
    }

    async validadorCodigoUnico(codigo){
        let product = await this.getProducts();

        try{
            const filteredPRoduct =  product.filter(producto => {
                return producto.code === codigo
            })
            console.log(filteredPRoduct);

            if(filteredPRoduct.length !== 0){
                return true
            }
        }catch(error){
            return false
        }
    }

    async addProducts(title, description, price, code, stock, thumbnail = 'sin imagen'){
        let product = await this.getProducts();
        let validador = await this.validadorCodigoUnico(code);
        let increment = await this.idIncrement();

        try{
            if(validador){
                console.log(`No se pueden agregar productos con el mismo código`);
            }else{
                product.push({ id: increment, title: title, description, price, thumbnail, code, stock})
                
                await fs.promises.writeFile(this.ruta, JSON.stringify(product));
                return {id: increment, title: title, description, price, thumbnail, code, stock}
            }
        }catch(error){
            console.log(error);
            return error;
        }
    }

    async getProductById(id){
        let product = await this.getProducts();
            const productById = product.find(producto => {
                return producto.id === id 
            })
    
            if(productById){
                // console.log(productById);
                return productById
            }else{
                console.log(`Not Found`);
                return this.products;
            }
    }


    async updateProduct(id, title, description, price, code, stock) {
        let update = {
            id,
            title,
            description,
            price,
            code,
            stock
        }
        try {
            
            let products = await this.getProducts();
            let position = products.findIndex((product) => product.id === id);
            if(position >= 0){
                // update.id = id;
                products.splice(position, 1, update);
                await fs.promises.writeFile(this.ruta, JSON.stringify(products));
            }else{
                console.log(`El producto no existe`);
                return 'El producto no existe'
            }
        } catch (error) {
            return error
        }
      }

    async deleteProduct(id){
        let product = await this.getProducts();
            const productsFilter = product.filter((producto) => {
                return producto.id !== id 
            })
            
        
        await fs.promises.writeFile(this.ruta, JSON.stringify(productsFilter));
        

    }

}

// const product = new ProductManager('../../product.json');

// let prueba = {
//     "id" : 4,
//     "title":"prueba",
//     "description":"prueba",
//     "price":200,
//     "thumbnail":"sin imagen",
//     "code":"prueba",
//     "stock":25
// }

// product.getProducts()
// product.addProducts('producto prueba UNO', 'este es un producto prueba', 200, '12asdrskf3dasasddasasdsdfasdafdgadsasd', 25);
// product.addProducts('producto prueba DOS', 'este es un producto prueba', 200, 'abfgyugtifasddswcdassdaasfgdsddasfddasd', 25);
// product.addProducts('producto prueba TRES', 'este es un producto prueba', 200, 'as56aqweuhq756dasdasa7dfsdasdfsdadsfruytrf', 25);
// product.getProducts()
// product.getProductById(1)
// product.updateProduct(1231321, prueba);

// product.deleteProduct(123123);

export default ProductManager;