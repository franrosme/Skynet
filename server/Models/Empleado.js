const mongoose = require('mongoose')

const EmpleadoSchema = new mongoose.Schema({
    nombreEmpleado: {
        type: String,
        required: false
    },
    rolEmpleado: {
        type: String,
        required: false
    },
    estadoEmpleado: {
        type: String,
        required: false
    }
})

const Empleado = mongoose.model('Empleado', EmpleadoSchema)
module.exports = Empleado