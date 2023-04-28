import express from "express"

const router = express.Router();
const food = [
    { name: "Banana", price: 200 },
    { name: "Manzana", price: 150 },
    { name: "Limón", price: 300 },
]

router.get("/food", (req, res) => {
    const testUser = {
        name: "Martín",
        isAdmin: true
    }
    res.render('food',
        {
            ...testUser,
            food,
            style: "food.css",
            title: 'My first foods'
        })
})

export default router