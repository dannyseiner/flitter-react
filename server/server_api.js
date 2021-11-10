const express = require("express")
const api = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const passwordHash = require('password-hash');
const { application } = require("express")


api.use(cors())
api.use(bodyParser.json())
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const log = (txt, data) => {
    console.clear()
    console.log(`------------ < ${txt} > ------------`)
    console.log(data)
    console.log(`------------ < ${txt} /> ------------`)
}
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
    console.log("hompage", { status: "WORKING" })

})

api.get("/user/:id", (res, req) => {
    con.query(`SELECT * FROM accounts WHERE account_id = ${res.params.id}`, (err, result) => {
        if (result.length == 0) {
            req.send({ status: false })
            return
        }
        req.send(result)
    })
})

api.get('/posts', (res, req) => {
    con.query("SELECT * FROM posts INNER JOIN accounts ON posts.post_author_id = accounts.account_id", (err, result) => {
        if (err) throw err
        log("posts", result)
        req.send(result)
    })
})

api.get('/post/:id', (res, req) => {
    if (res.params.id === "notfound") return
    con.query(`SELECT * FROM posts INNER JOIN accounts ON posts.post_author_id = accounts.account_id WHERE post_id = ${res.params.id}`, (err, result) => {
        if (err) throw err
        req.send(result)
        log("post", result)
    })
})
api.get('/post/:id/comments', (res, req) => {
    if (res.params.id === "notfound") return
    con.query(`SELECT * FROM post_comments INNER JOIN accounts ON comment_author_id = accounts.account_id WHERE comment_post_id = ${res.params.id} AND post_comments.comment_on_comment_id = 0`, (err, result) => {
        if (err) throw err
        req.send(result)
        log("post comments", result)
    })
})

api.get('/post/:id/comments/:onco', (res, req) => {
    con.query(`SELECT * FROM post_comments WHERE comment_on_comment_id = ${res.params.onco} AND comment_post_id = ${res.params.id}`, (err, result) => {
        if (err) throw err
        log("COMMENTS ON COMMENT", result)
        req.send(result)

    })
})

// POST COMMENT
api.post('/addComment', urlencodedParser, (req, res) => {
    log("ADD COMMENT", req.body)
    con.query(`INSERT INTO post_comments (comment_post_id, comment_author_id, comment_content) VALUES
    ( 
        ${req.body.post_id},
        ${req.body.author_id},
        '${req.body.comment_content}'
    )
    `)
})

api.get('/table/:table', (res, req) => {
    con.query(`SELECT * FROM ${res.params.table}`, (err, result) => {
        if (err) throw err
        req.send(result)
    })
})

api.get("/user/posts/:id", (res, req) => {
    con.query(`SELECT * FROM posts WHERE post_author_id = ${res.params.id}`, (err, result) => {
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
            log("login", result)
        } else {
            res.send({ status: false, password: false })
            log("login", { status: false, password: false })

        }
    })

})

// REGISTER
api.post('/register', urlencodedParser, (req, res) => {
    console.log()
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
                log("register", { status: true })
            })

        } else {
            res.send({ status: false })
            log("register", { status: false })
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