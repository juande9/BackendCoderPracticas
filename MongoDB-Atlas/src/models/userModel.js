import mongoose, { Schema } from "mongoose"

const userCollection = "users"

const userSchema = new mongoose.Schema({
    nombre: { type: Schema.Types.String, },
    apellido: { type: Schema.Types.String, },
    edad: { type: Schema.Types.Number, },
    dni: { type: Schema.Types.Number, require: true },
    curso: { type: Schema.Types.String, },
    nota: { type: Schema.Types.String, },
    enable: { type: Schema.Types.Boolean, default: true }
})

export default mongoose.model(userCollection, userSchema)