import express from "express";
import ProductRouter from "./router/product.routes.js";
import CartRouter from "./router/carts.routes.js";
import viewsRouter from "./router/views.routes.js";
import {engine} from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controllers/ProductManager.js";
import {Server} from "socket.io"

const app = express()
const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor express puerto ${PORT}}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//Handlebars configuracion
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//static
app.use("/", express.static(__dirname +  "/public"))

//Routes
app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)
app.use("/", viewsRouter)

//Web socket
const productAll = new ProductManager()

const socketServer = new Server(server)

socketServer.on('connection', async socket => {
    console.log('Nuevo cliente conectado')

    socket.on('crearProducto', async (product) => {
        let newProduct = await productAll.addProducts(product)
        console.log(newProduct)

        socket.emit('upDateListProduct', await productAll.getProducts())
    })

    socket.on('borrarProducto', async(idProduct)=> {
        let borrarProd = await productAll.deleteProducts(idProduct)
        console.log(borrarProd)
        socket.emit('upDateListProduct', await productAll.getProducts())
    })


    //Desconecta un cliente
    socket.on('disconnect', () => {console.log('Cliente desconectado')})
})