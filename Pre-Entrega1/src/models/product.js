export class Product {

    constructor({ title, description, price, thumbnail, code, stock, id, status, category }){
        
        this.id = id
        this.code = code
        this.status = status ?? true
        this.title = title
        this.category = category
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.stock = stock
    }
   
}