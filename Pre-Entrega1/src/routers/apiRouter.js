import { Router } from "express";
import { productRouter } from "./productRouter.js";
import { cartsRouter } from "./cartsRouter.js";

export const apiRouter = Router ();

apiRouter.use("/products", productRouter);

apiRouter.use("/carts", cartsRouter);