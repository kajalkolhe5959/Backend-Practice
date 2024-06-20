import express from 'express'

const app = express()

const port = 8081

app.listen(port, () => {
    console.log(`server is running at port:${port}...`)
})


app.use(express.json())

let teaData = []
let nextId = 1

app.post('/teas', (req, res) => {
    const { name, price } = req.body
    const newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(200).send(newTea)

})

app.get('/teas', (req, res) => {
    res.status(200).send(teaData)
})
app.get('/tea/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found")
    }
    res.status(202).send(tea)

})
app.put('/tea/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found")
    }
    const { name, price } = req.body
    tea.name = name
    tea.price = price
    res.status(202).send(tea)

})
app.delete('/tea/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))

    if (index == -1) {
        return res.status(404).send("tea not found")
    }
    teaData.splice(index, 1)
    return res.status(200).send(`deleted`)


})






















// app.get('/', (req, res) => {
//     res.send("Hello From Kajal")
// })
// app.get('/ice-tea', (req, res) => {
//     res.send("what would you prefer Kajal?")
// })
// app.get('/twitter', (req, res) => {
//     res.send("Kajal.com")
// })