import fs from 'fs/promises'
import { Product } from '../models/product.js'
import {v4 as uuidv4} from "uuid"

export class ProductManager {
    #products

    constructor(){
        this.path = "../../db/productos.json"
        this.#products = []
    }

    // async reset(){
    //     this.#products = []
    //     await this.#writeProducts()
    // }

    async #writeProducts(){
        const productsJson = JSON.stringify(this.#products, null, 2) //convierte objeto javascript en json 
        await fs.writeFile(this.path, productsJson) //escribe el archivo con los productos en json
    }

    async #readProducts(){
        const productsInJson = await fs.readFile(this.path, 'utf-8')
        const dataProducts = JSON.parse(productsInJson) //convierte el json en objeto javascript
        return dataProducts
        // this.#products = dataProducts.map(j => new Product())
    }

    async updateProducts(id, productData){
        await this.#readProducts()
        const indexEncontrado = this.#products.findIndex(p => p.id === id)
        if(this.#products[indexEncontrado]){
            const newProd = new Product({id, ...this.#products[indexEncontrado], ...productData})
            this.#products[indexEncontrado] = newProd
            await this.#writeProducts()
            return newProd
        }
        else{
            throw new Error('No se puede actualizar, producto no encontrado')
        } 
    }

    async deleteProduct(id){
        await this.#readProducts()
        const i = this.#products.findIndex(p => p.id === id)
        if(this.#products[i]){
            const newArray = this.#products.splice(i, 1)
            await this.#writeProducts()
            return newArray[0]
        }
        else{
            throw new Error('No se puede borrar, producto no encontrado')
        }
    }

    async addProduct({title, description, price, thumbnail, code, stock, status, category}){
        if (!title || !description || !price || !thumbnail || !stock || !category || !code) {
            console.log('Error: Todos los campos son obligatorios');
            return;
        }
        else{
            await this.#readProducts()
            const id = uuidv4()
            const product = new Product({id, title, category, description, price, thumbnail, code, status, stock})
            const findid = this.#products.find(p => p.id === id)
            if ((!findid)){
                this.#products = await this.getProductsArray()
                this.#products.push(product)
                await this.#writeProducts()
            }
            else{
                throw new Error("Repeated id")
            }
            return product
        }
    }

    async getProductsArray(){ //devuleve array con todos los productos
        await this.#readProducts()
        return this.#products
    }

   async getProductById(id){ //devuelve un solo producto
        const response = this.getProductsArray()
        const find = response.find(p => p.id === id)
        if (!find){
            throw new Error("Not found")
        } 
        return find
    }

    async getProductsJSON(limit){ //devuelve los productos en objeto json
        const json = await fs.readFile(this.path, "utf-8")
        const data = JSON.parse(json)
        if (limit){
            if (isNaN(limit)){
                throw new Error("NaN")
            }
            return data.slice(0, limit)
        }
        return data
    }

    async getProductByIdJSON(id){ //devuelve un solo producto en objeto json
        const json = await fs.readFile(this.path, 'utf-8')
        const products = JSON.parse(json)
        const productById = products.find(p => p.id === parseInt(id))
        if (!productById) throw new Error(`Product ${id} Not Found`)
        return productById
    }
}