const { Schema, model } = require("mongoose");

const productoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true,
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
    },
    descripcion: {
        type: String,
    },
    disponible: {
        type: Boolean,
        default: true,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
});

productoSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...data } = this.toObject();
    data.id = _id;
    return data;
};

module.exports = model("Producto", productoSchema);