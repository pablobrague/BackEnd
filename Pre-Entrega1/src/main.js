import express from "express";
import { apiRouter } from "./routers/apiRouter.js";

const app = express()

app.use(express.json())

app.use("/api", apiRouter)

// app.use((err, req, res, next) => {
//     res.json({
//       status: 'error',
//       descr: err.message
//     })
//   })

  app.listen(8080,() =>{
    console.log(`Conectado!`)
    console.log(process.cwd());
})

//se hizo npm install de express, nodemon y uuid
