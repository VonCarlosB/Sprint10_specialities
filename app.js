const express = require('express')
const app = express()
const usersData = require('./users')
const specialities = ['marketing', 'developers', 'QAs', 'ventas']
const PORT = 3000

//ROUTES

app.get('/', (req, res) => {
    res.send(`<h1>Página principal</h1><ul>${createLinks()}</ul>`)
})

specialities.forEach(route => createRoute(route))

app.use((req, res) => {
    res.status(404).send('<h1>Página no encontrada</h1><a href="/">Home</a>')
})

//LISTEN

app.listen(PORT, () => {
    console.log('Server listening on port http://localhost:'+PORT)
})

//FUNCTIONS

function checkSpeciality(spec){
    return usersData.filter((user) => user.specialty===spec)
}

function specialtyTemplate(spec){
    const users = checkSpeciality(spec)
    return`
    <a href="/">Inicio</a><br>
    <h3>Nº de usuarios: ${users.length}</h3>
    <ul>
    ${users.map((user) => {
        return `
        <li>
            <ul><u>${user.name}</u>:
                <li><b>ID:</b> ${user.id}</li>
                <li><b>Age:</b> ${user.age}</li>
                <li><b>Specialty:</b> ${user.specialty}</li>
            </ul>
        </li>
        `
        }).join("")}
    </ul>
    `
}

function createRoute(route){
    app.get(`/${route}`, (req, res) => {
        res.send(`<h2>Specialty: ${route}</h2>`+specialtyTemplate(route))
    })
}

function linkTemplate(link){
    return `<li><a href=${link==='home' ? "/" : link}>${link}</a></li>`
}

function createLinks(){
    return specialities.map(link => linkTemplate(link)).join("")
}