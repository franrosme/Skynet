const mongoose = require('mongoose')

const ProductoSchema = new mongoose.Schema({
    nombreProducto: {
        type: String,
        required: true
    },
    precioProducto: {
        type: Number,
        required: true
    },
    estadoProducto: {
        type: String,
        required: true
    }
})

const Producto = mongoose.model('Producto', ProductoSchema)
module.exports = Producto