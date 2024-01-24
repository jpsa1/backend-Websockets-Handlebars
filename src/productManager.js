import {promises as fs} from "fs"

class ProductManager {

    constructor() {
        this.path = "./bd.json"
        this.productos = []
    }
    
    #id = 0

    readProducts = async() => {
        let readPro = await fs.readFile(this.path, "utf-8")
         
        if(!readPro) {return []}

        return JSON.parse(readPro)
    }
    
    async getProducts() { 
        const productos = await this.readProducts()
        // console.log(productos)
        return productos
    }

    async addProduct(title, description, price, thumbail, code, stock) {
        
        //Controla que todos los valores contengan datos. 
        
        if(!(title && description && price && thumbail && code && stock)) {
            console.log("ERROR: Todos los campos son requeridos")
            return
        }

        //Controlar que el producto no este repetido

        this.productos = await this.readProducts()
        if (this.productos.find(n => n.code === code)) return console.log('ERROR: Producto repetido')
        
        
        let producto = {
            id: this.#id,
            title: title,
            description: description,
            price: price,
            thumbail: thumbail,
            code: code,
            stock: stock
        }

        this.#id++
        this.productos.push(producto)

        await fs.writeFile(this.path, JSON.stringify(this.productos))

        console.log("Producto agregado exitosamente")  
    }
    
    async getProductById(getId) {
        this.productos = await this.readProducts()
        return (this.productos.find(n => n.id == getId) || "ERROR: Product not found")
    }

    async updateProduct(getId, updatePro) {
        let productOld = await this.getProductById(getId)

        if(typeof productOld !== "object") return console.log(updatePro)

        updatePro = {...productOld, ...updatePro}

        this.productos = await this.readProducts()

        let newProducts = this.productos.filter(n => n.id !== getId)

        newProducts.push(updatePro)

        await fs.writeFile(this.path, JSON.stringify(newProducts))

        console.log("Producto actualizado correctamente")
    
    }

    async deleteProduct(getId) {
        this.productos = await this.readProducts()
        this.productos = this.productos.filter(n => n.id !== getId)

        await fs.writeFile(this.path, JSON.stringify(this.productos))

        console.log('Producto eliminado!')
    }
}


//Instanciando la clase
const administrador = new ProductManager

//✓	Se llama “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
// administrador.getProducts()

//✓	Se llama al método “addProduct” con los campos detallados
// administrador.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc129", 25)

//Se agregan 2 productos mas
// administrador.addProduct("producto prueba2", "Este es un producto prueba2", 200, "Sin imagen2", "abc124", 40)
// administrador.addProduct("producto prueba3", "Este es un producto prueba3", 200, "Sin imagen3", "abc125", 50)

//✓	Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
// administrador.getProductById(0).then(resolve => console.log(resolve))

//Update de producto
// administrador.updateProduct(0,{description: 'Descripcion actualizada', price: 700 })

//Faltan datos para ingresar el nuevo producto
// administrador.addProduct("producto prueba5", "", 500, "Sin imagen5","", 500)

//Eliminar un producto por Id
// administrador.deleteProduct(1)

//Exporto la instancia
export default administrador








