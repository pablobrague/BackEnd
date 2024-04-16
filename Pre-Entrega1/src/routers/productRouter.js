import { Router } from 'express';
import { ProductManager } from '../services/productManager.js';

// const productosJson = "C:\Users\dean2\OneDrive\Escritorio\Pre-Entrega1\db\productos.json";
const pm = new ProductManager();


export const productRouter = Router();

productRouter.get('/', async (req, res) => {
  try{
    const limit = parseInt(req.query.limit);
    const productos = pm.getProductsJSON(limit);
    res.json(productos);
  }
  catch (error) {
    console.log(error);
    res.send("Error al Intentar Recibir Productos")
  }
  
});

productRouter.get('/:pid', async (req, res) => {
  const id = req.params.pid;
  try {
    const product = pm.getProductByIdJSON(id);
    res.json(product);
  } 
  catch (error) {
    console.log(error);
    res.send("Error al Intentar Recibir el ID del Producto")
  }
});

productRouter.post('/', async (req, res) => {
try {
  const {title, description, price, thumbnail, code, stock, category} = req.body;
  const result = await pm.addProduct({title, description, price, thumbnail, code, stock, category});
  res.json(result);
} 
catch (error) {
  console.log(error);
  res.send("Error al Intentar Crear el Producto")
}
});

productRouter.put('/:pid', async (req, res) => {
  const {pid} = req.params
  try {
    const {title, description, price, thumbnail, code, stock, status, category} = req.body;
    const result = await pm.updateProducts(id, {title, description, price, thumbnail, code, stock, status, category});
    res.json(result);
  } 
  catch (error) {
    console.log(error);
    res.send(`Error al Intentar Actualizar el Producto con ID ${pid}`)
  }
})

productRouter.delete('/:pid', async (req, res) =>{
  const {pid} = req.params
  try {
    await pm.deleteProduct(id)
    res.send(`Producto con ID ${pid} Eliminado Exitosamente!`)
  } catch (error) {
    console.log(error);
    res.send(`Error al Intentar Eliminar el Producto con ID ${pid}`)
  }
})
