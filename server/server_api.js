const express = require("express")
const api = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const passwordHash = require('password-hash');


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

api.get('/posts', (res, req) => {
    con.query("SELECT * FROM posts INNER JOIN accounts ON posts.post_author_id = accounts.account_id", (err, result) => {
        if (err) throw err
        req.send(result)
    })
})

api.get('/post/:id', (res, req) => {
    con.query(`SELECT * FROM posts INNER JOIN accounts ON posts.post_author_id = accounts.account_id WHERE post_id = ${res.params.id}`, (err, result) => {
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


// LOGIN 
api.post('/login', urlencodedParser, (req, res) => {
    console.log(req.body)
    con.query(`SELECT * FROM accounts WHERE account_email = '${req.body.email}'`, (err, result) => {
        if (err) throw err
        if (result.length == 0) return res.send({ status: false })
        if (passwordHash.verify(req.body.password, result[0].account_password)) {
            res.send(result)
        } else {
            res.send({ status: false, password: false })
        }
    })
})

// REGISTER
api.post('/register', urlencodedParser, (req, res) => {
    console.log(req.body)
    // CHECK FOR EMAIL 
    con.query(`SELECT * FROM accounts WHERE account_email='${req.body.email}' OR account_name='${req.body.username}'`, (err, result) => {
        // CREATE USER AND SEND DATA BACK
        if (result.length == 0) {
            con.query(`INSERT INTO accounts (account_email, account_name, account_password) VALUES 
            (
                '${req.body.email}',
                '${req.body.username}',
                '${req.body.password}'
            )`, (errr, resultt) => {
                res.send({ status: true })
            })

        } else {
            res.send({ status: false })
        }
        // EMAIL OR USERNAME USED
        if (err) throw err
    })
})



// API TEST
api.post('/postTest', urlencodedParser, function (req, res) {
    req.body.status = "DONE"
    req.body.result = "WORKING"
    res.send(req.body)
})


api.listen(3001)