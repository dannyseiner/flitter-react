const express = require("express")
const api = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const passwordHash = require('password-hash');

api.use(bodyParser.json())
api.use(cors())
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
api.get("/", (req, res) => {
    res.send({ status: "WORKING" })
    console.log("hompage", con, { status: "WORKING" })

})

api.get("/user/:id", (req, res) => {
    con.query(`SELECT * FROM accounts
    INNER JOIN account_info ON accounts.account_id = account_info.user_id
    WHERE accounts.account_id = ${req.params.id}`, (err, result) => {
        if (err) throw err
        console.log(result)
        if (result.length == 0) {
            res.send({ status: false })
            return
        }
        res.send(result)
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

api.get(`/post/:id/isliked/:accid`, (res, req) => {
    con.query(`SELECT * FROM post_likes WHERE like_post_id = ${res.params.id} AND like_account_id = ${res.params.accid}`, (err, result) => {
        req.send(result)
    })
})

api.get('/post/:id/comments', (res, req) => {
    if (res.params.id === "notfound") return
    con.query(`SELECT * FROM post_comments INNER JOIN accounts ON comment_author_id = accounts.account_id WHERE comment_post_id = ${res.params.id}`, (err, result) => {
        if (err) throw err
        req.send(result)
        log("post comments", result)
    })
})
// GET FRIENDS
api.get('/user/:id/messages', (res, req) => {
    const id = res.params.id
    con.query(`SELECT *  FROM account_friends INNER JOIN accounts ON account_friends.id_user1 = accounts.account_id  WHERE id_user1 = ${id} AND id_user2 != ${id} OR id_user2 = ${id} AND id_user2 != ${id}`, (err, result) => {
        req.send(result)
        log("friends", result)
    })
})

// LIKE POST
api.post('/likePost', urlencodedParser, (req, res) => {
    log("LIKE POST", req.body)
    con.query(`SELECT * FROM post_likes WHERE like_post_id = ${req.body.postId} AND like_account_id = ${req.body.accountId}`, (err, result) => {
        console.log(result)
        if (result.length == 0) {
            con.query(`INSERT INTO post_likes (like_post_id, like_account_id) VALUES (${req.body.postId}, ${req.body.accountId})`, (err, result2) => {
                res.send({ status: "liked" })
                return
            })
        } else {
            con.query(`DELETE FROM post_likes WHERE like_post_id = ${req.body.postId} AND like_account_id = ${req.body.accountId}`, (err, result3) => {
                res.send({ status: "unliked" })
                return
            })
        }
    })
})
// CREATE POST
api.post('/createPost', urlencodedParser, (req, res) => {
    log("CREATE POST", req.body)
    con.query(`INSERT INTO posts (post_author_id, post_title,post_content) VALUES
    ( 
        ${req.body.author_id},
        '${req.body.title}',
        '${req.body.content}'
    )
    `)
    con.query(`SELECT * FROM posts WHERE post_author_id = ${req.body.author_id} AND post_title = '${req.body.title}' AND post_content = '${req.body.content}'`, (err, result) => {
        res.send(result)
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
