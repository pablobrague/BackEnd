import {promises as fs} from "fs"
import {v4 as uuidv4} from "uuid"
import { Cart } from "../models/cart.js";

export class cartManager {

    constructor(){
        this.path = "../../db/cart.json";
        this.carts = [];
    }

    async #writeCarts(){
        const cartsJson = JSON.stringify(this.carts, null, 2) //convierte objeto javascript en json 
        await fs.writeFile(this.path, cartsJson) //escribe el archivo con los productos en json
    }

    async #readCarts(){
        const cartsInJson = await fs.readFile(this.path, 'utf-8')
        const dataCarts = JSON.parse(cartsInJson) //convierte el json en objeto javascript
        return dataCarts
    }

    getCartProducts = async (id) =>{
        const carts = await this.#readCarts();
        const cart = carts.find(cart => cart.id === id);

        if (cart) {
            return cart.products
        }
        else {
            console.log("Carrito no Encontrado");
        }

    newCart = async () =>{
        const id = uuidv4();
        const newCart = new Cart ();

        this.carts = await this.#readCarts();
        this.carts.push(newCart);

        await this.#writeCarts();
        return newCart;
    }

    addProductToCart = async (cart_id, product_id) => {
        const carts = await this.#readCarts()
        const index = carts.findIndex(cart => cart.id === cart_id)

        if(index != -1) {
            const cartProducts = await getCartProducts (cart_id)
            const existProductIndex = cartProducts.findIndex(product => product_id === product_id)

            if (existProductIndex != -1){
                cartProducts[existProductIndex].quantity = cartProducts[existProductIndex].quantity + 1;
            }
            else{
                cartProducts.push({product_id, quantity : 1})
            }

            carts[index].products = cartProducts
            await this.#writeCarts()
            console.log("Producto Agregado con Exito!");
        }
        else{
            console.log("Carrito No Encontrado");
        }
    }

    }

}