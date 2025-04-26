const express = require('express')
const app = express()
const usersData = require('./users')
const specialities = ['marketing', 'developers', 'QAs', 'ventas']

//ROUTES

app.get('/', (req, res) => {
    res.send(`<h1>Página principal</h1><ul>${createLinks()}</ul>`)
})

for (const route of specialities) {
    createRoute(route)
}

app.use((req, res) => {
    res.status(404).send('<h1>Página no encontrada</h1><a href="/">Home</a>')
})

//LISTEN

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})

//FUNCTIONS

function checkSpeciality(spec){
    return usersData.filter((user) => user.specialty===spec)
}

function specialtyTemplate(spec){
    let users = checkSpeciality(spec)
    let ans = `
    <a href="/">Inicio</a><br>
    <h3>Nº de usuarios: ${users.length}</h3>
    <ul>
    `
    for (const user of users) {
        ans += `
        <li><ul><u>${user.name}</u>:
            <li><b>ID:</b> ${user.id}</li>
            <li><b>Age:</b> ${user.age}</li>
            <li><b>Specialty:</b> ${user.specialty}</li>
        </ul></li>
        `
    }
    ans += '</ul>'
    return ans
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
    let ans = ''
    for (const link of specialities) {
        ans += linkTemplate(link)
    }
    return ans
}