import express from "express"

const app = express()
const server = app.listen(8080, () => console.log("Server running on 8080"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let users = []

app.post("/api/user", (req, res) => {
    let user = req.body
    if (!user.lastName || !user.firstName) {
        return res.status(400).send({ status: "error", error: "Incomplete fields" })
    }

    users.push(user)
    res.send({ status: "success", message: `User: ${user.lastName} created` })
})

app.get("/api/users", (req, res) => {
    res.send({ status: "success", users })
})


app.delete("/api/user/:name", (req, res) => {
    let name = req.params.name
    
    let newUsers = users.filter(user => user.firstName !== name)

    res.send({status:"success", newUsers})
    
})