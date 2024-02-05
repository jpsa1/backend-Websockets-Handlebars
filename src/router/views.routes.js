import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";

const viewsRouter = Router()
const product = new ProductManager


viewsRouter.get("/", async (req,res) => {
    let allProducts = await product.getProducts()
    res.render("home", {
        title: "Product Manager",
        products: allProducts
    })
})

viewsRouter.get("/realTimeProducts", async (req, res) => {
    let allProducts = await product.getProducts()
    res.render("realTimeProducts", {allProducts})
})

export default viewsRouter