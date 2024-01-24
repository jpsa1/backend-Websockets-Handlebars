import express from 'express'
import administrador from './productManager.js'

const app = express()
const port = 8080


//GET

//Controlar que el servidor esta funcionando correctamente
app.get("/ping", (req, res) => {
    res.send("pong")
})

//Devuelve todos los productos o el limite del usuario
app.get("/products", async(req, res) => {
    // console.log(req.params)
    // console.log(req.query)

    if (req.query.limit == undefined) {
        res.send(await administrador.getProducts())
    }else {
        
        let limiteProductos = []
        let productos = await administrador.getProducts()
        
        // console.log(productos)
        
        for (let i = 0; i < productos.length; i++ ) {

            limiteProductos.push(productos[i])
            if (i == req.query.limit-1) break
        }
        
        // console.log(limiteProductos)

        res.send(limiteProductos)
    }
})

// Devuelve el producto por params
app.get("/products/:pid", async(req, res) => {
    res.send(await administrador.getProductById(req.params.pid))
})


//Arranca el servidor
app.listen(port, () => {
    console.log(`El servidor esta escuchando en el puerto ${port}`)
})