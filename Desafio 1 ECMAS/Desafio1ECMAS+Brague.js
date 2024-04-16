class ProductManager {
    #products = [];
    #proxIdCode = 1;

    constructor() {}

    getCodeAutoincremental() {
        return this.#proxIdCode++;
    }

    addProduct(datosProducto) {
        const idCode = this.getCodeAutoincremental();
        const validacion = this.#products.some(producto => producto.getCode() === idCode);

        if (validacion) {
            throw new Error("Código Repetido");
        } else {
            const productos = new Producto({ title: datosProducto.title, description: datosProducto.description, price: datosProducto.price, thumbnail: datosProducto.thumbnail, stock: datosProducto.stock, code: idCode });
            this.#products.push(productos);
            return productos;
        }
    }

    getProducts() {
        return this.#products.map(producto => ({ code: producto.getCode(), ...producto }));
    }

    getProductById(idCode) {
        const producto = this.#products.find(e => e.getCode() === idCode);
        if (!producto) {
            throw new Error("Not found");
        } else {
            return producto;
        }
    }
}

class Producto {
    #code;
    title;
    description;
    price;
    thumbnail;
    stock;

    constructor({ title, description, price, thumbnail, stock, code }) {
        this.#code = code;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
        if (title === undefined || description === undefined || price === undefined || thumbnail === undefined || stock === undefined) {
            throw new Error("Los campos son OBLIGATORIOS!");
        }
    }

    getCode() {
        return this.#code;
    }
}
    
//Pruebas --------------------------------------------------------------------------------------------------

const manager = new ProductManager ();

console.log("Agregando Producto 1 Azucar");

const newProduct = manager.addProduct({
    title: "Azucar",//(nombre del producto)
    description: "Azucar",//(descripción del producto)
    price: 700, //(precio)
    thumbnail: "Pepito.com", //(ruta de imagen)
    stock: 50 //(número de piezas disponibles) 
});

console.log(newProduct);

console.log("Agregando Producto 2 Pan");

const newProduct2 = manager.addProduct({
    title: "Pan",//(nombre del producto)
    description: "Pan",//(descripción del producto)
    price: 750, //(precio)
    thumbnail: "Pepito.com", //(ruta de imagen)
    stock: 55 //(número de piezas disponibles) 
});

console.log(newProduct2);

console.log("Total de Productos en Array");

const totalProducts = manager.getProducts ();

console.log(totalProducts);

console.log("Encontrando Producto por ID");

const findProduct = manager.getProductById (2);

console.log(findProduct);

console.log("Agregando Producto 3 Harina (Prueba Campos Obligatorios)");

const newProduct3 = manager.addProduct({
    title: "Harina",//(nombre del producto)
    description: "Harina",//(descripción del producto)
    // price: 550, //(precio)
    stock: 105 //(número de piezas disponibles) 
});


// paso comando node : node Desafio1ECMAS+Brague.js


    