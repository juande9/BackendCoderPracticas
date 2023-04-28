import express from "express"
import userModel from "../models/userModel.js";

const userRouter = express.Router();

userRouter.get("/api/users", async (req, res) => {
    const users = await userModel.find()
    res.send({ status: "success", payload: users })
})

userRouter.get("/api/user/:id", async (req, res) => {
    const { id } = req.params
    const userFound = await userModel.findOne({ _id: id })
    res.send({ status: "success", payload: userFound })
})

userRouter.post("/api/user", async (req, res) => {
    const user = await userModel.create(req.body);
    res.send({ status: "success", message: `User: ${user.nombre} created`, user })
})

userRouter.put("/api/:id", async (req, res) => {
    const { id } = req.params
    const userUpdated = await userModel.updateOne({ _id: id }, req.body);
    res.send({ status: "success", message: "Usuario updated", userUpdated })
})

userRouter.delete("/api/user/:id", async (req, res) => {
    const { id } = req.params
    const userDeleted = await userModel.deleteOne({ _id: id });
    res.send({ status: "success", message: "Usuario eliminado" })
})

export default userRouter