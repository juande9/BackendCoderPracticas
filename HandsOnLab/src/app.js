import express from "express"

const app = express()
const server = app.listen(8080, () => console.log("Server running on 8080"))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let frase = "Frase inicial"

app.get("/api/frase", (req, res) => {
    res.status(200).json({ frase });
})

app.get("/api/palabras/:pos", (req, res) => {
    const pos = +req.params.pos - 1
    const fraseSeparated = frase.split(" ")

    const buscada = fraseSeparated[pos]

    res.status(200).json({ buscada });
})

app.post('/api/palabras', (req, res) => {
    const { palabra } = req.body;
    const palabras = frase.split(' ');
    palabras.push(palabra);
    frase = palabras.join(" ");
    const pos = palabras.length

    res.status(201).json({ agregada: palabra, pos });
});

app.put("/api/palabras/:pos", (req, res) => {
    const pos = +req.params.pos - 1
    const { palabra } = req.body;
    const palabras = frase.split(' ');
    const anterior = palabras[pos]
    palabras[pos] = palabra
    frase = palabras.join(" ")

    res.status(201).json({ agregada: palabra, anterior });

})

app.delete("/api/palabras/:pos", (req, res) => {
    const pos = +req.params.pos - 1
    const palabras = frase.split(' ');
    const eliminada = palabras.splice(pos,1)
    frase = palabras.join(" ")
    
    res.status(201).json({ eliminada , frase});

})
