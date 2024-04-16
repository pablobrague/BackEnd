import { Router } from "express";
import { cartManager } from "../services/cartManager.js";

// const carritosJson = "../../db/cart.json";
const cm = new cartManager ();

export const cartsRouter = Router();

// CREAR CARRITO

cartsRouter.post("/", async (req, res) => {
    try {
        const response = await cartManager.newCart();
        res.json(response);
    } 
    catch (error) {
        res.send("Error al Crear el Carrito");
    }
});

cartsRouter.get("/:cid", async (req, res) => {
    const {cid} = req.params;
    try {
        const response = await cartManager.getCartProducts(cid);
        res.json(response);
    } 
    catch (error) {
        res.send("Error al Enviar los Productos del Carrito");
    }
});

cartsRouter.post("/:cid/products/:pid", async (req, res) =>{
    const {cid, pid} = req.params;
    try {
        await cartManager.addProductToCart(cid, pid);
        res.send("Producto Agregado!");
    } 
    catch (error) {
        res.send("Error al Guardar Producto en el Carrito");
    }

});