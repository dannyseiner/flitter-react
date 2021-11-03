const express = require("express")
const api = express()
const mysql = require('mysql')
const cors = require('cors')
var bodyParser = require('body-parser')


api.use(cors())
api.use(bodyParser.json())
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const con = mysql.createConnection({
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    user: 'admin',
    password: 'admin',
    host: '127.0.0.1',
    database: 'flitter'
})

con.connect(function (err) {
    if (err) throw err
    console.log("Connected!")
})


// ROUTES
api.get("/", (res, req) => {
    req.send({ status: "WORKING" })
})

api.get('/accounts', (res, req) => {
    con.query("SELECT * FROM accounts", (err, result) => {
        if (err) throw err
        req.send(result)
    })
})

api.get('/table/:table', (res, req) => {
    con.query(`SELECT * FROM ${res.params.table}`, (err, result) => {
        if (err) throw err
        req.send(result)
    })
})

// API TEST

api.post('/postTest', urlencodedParser, function (req, res) {
    req.body.status = "DONE"
    req.body.result = "WORKING"
    res.send(req.body)
})


api.listen(3001)