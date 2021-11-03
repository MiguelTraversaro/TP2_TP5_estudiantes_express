const express = require("express")

const port = 5000

const app = express()

const resource = "estudiante"

const route = `/${resource}`

const estudiantes = [
    {
        nombre: "Juan",
        apellido: "Perez",
        dni: 39264182,
        edad: 25,
    },
    {
        nombre: "Pedro",
        apellido: "Gomez",
        dni: 3241694,
        edad: 40,
    },
    {
        nombre: "Juan",
        apellido: "Carlos",
        dni: 4202470,
        edad: 69,
    }
]

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post(route, (req, res) => {
    const estudiante = req.body
    const existe = estudiantes.find((est) => {
        return est.dni == estudiante.dni
    })
    if (!existe) {
        estudiantes.push(estudiante)
        res.status(200)
        res.json(estudiante)
    } else {
        res.status(409)
        res.send()
    }
})

app.get(route, (req, res) => {
    res.json(estudiantes)
})

app.get(`${route}/edad/:rango`, (req, res) => {
    const edadMin = parseInt(req.params.rango.split(",")[0])
    const edadMax = parseInt(req.params.rango.split(",")[1])
    const existe = estudiantes.filter(est => edadMin < est.edad && est.edad < edadMax)
    if (existe.length !== 0) {
        res.status(200)
        res.json(existe)
    } else {
        res.status(404)
        res.send("Estudiantes no encontrados")
    }
})

app.get(`${route}/:dni`, (req, res) => {
    const dni = parseInt(req.params.dni)
    const existe = estudiantes.find((est) => {
        return est.dni == dni
    })
    if (existe) {
        res.status(200)
        res.json(existe)
    } else {
        res.status(404)
        res.send("DNI no encontrado")
    }
})

app.put(route, (req, res) => {
    const estudiante = req.body
    let existe = estudiantes.find((est) => {
        return est.dni == estudiante.dni
    }) 
    if (existe) {
        existe = estudiante
        res.status(200)
        res.json(existe)
    } else {
        res.status(404)
        res.send("Estudiante no encontrado")
    }
})

app.delete(route, (req, res) => {
    const estudiante = req.body
    let existe = estudiantes.find(est => est.dni == estudiante.dni )
    let index = estudiantes.findIndex(est => est.dni == existe.dni )
    if (existe) {
        estudiantes.splice(index,1)
        res.status(200)
        res.json(estudiantes)
    } else {
        res.status(404)
        res.send("Estudiante no encontrado")
    } 
})

app.listen(port, () => {
    console.log("Escuchando")
})