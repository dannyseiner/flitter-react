const express = require("express")
const api = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const passwordHash = require('password-hash');
const config = require("./config.json")

api.use(bodyParser.json())
api.use(cors())
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const log = (txt, data) => {
    console.clear()
    console.log(`------------ < ${txt} > ------------`)
    console.log(data)
    console.log(`------------ < ${txt} /> ------------`)
}
const con = mysql.createConnection(config)
con.connect(function (err) {
    if (err) throw err
    console.log("Connected!")
})


// ROUTES
api.get("/", (req, res) => {
    res.send({ status: "WORKING" })
    console.log("hompage", con, { status: "WORKING" })
})

// GET USER
api.get("/user/:id", (req, res) => {
    con.query(`SELECT * FROM accounts
    INNER JOIN account_info ON accounts.account_id = account_info.user_id
    WHERE accounts.account_id = ${req.params.id}`, (err, result) => {
        if (err) throw err
        if (result.length == 0) {
            res.send({ status: false })
            return
        }
        // CHECK FOR IMAGE
        result[0]["decoded_image"] = decodeImage(result[0].account_image)
        res.send(result)
    })
})

// LOAD USERS BY EXACT NAME OR EMAIL
api.get('/searchUser/:name', (req, res) => {
    con.query(`SELECT * FROM accounts WHERE account_name = '${req.params.name}' OR account_email='${req.params.name}'`, (err, result) => {
        res.send(result)
    })
})

// DELETE FRIEND SHIP 
api.post('/removefriend', urlencodedParser, (req, res) => {
    con.query(`DELETE FROM account_friends WHERE id_user1=${req.body.user1} AND id_user2=${req.body.user2}`, (err, result) => {
        res.send({ status: "done" })
    })
    console.log(req.body)
})

// GET USER FRIENDS
api.get('/getfriends/:id', (req, res) => {
    con.query(`
    SELECT 
        f.id_friendship,
        f.friendship_status,
        acc.account_id as user1_id,
        acc.account_name as user1_name,
        ac.account_id as user2_id,
        ac.account_name as user2_name,
        as1.account_image as user1_image,
        as2.account_image as user2_image
    FROM account_friends as f 
        INNER JOIN accounts as acc ON f.id_user1 = acc.account_id
        INNER JOIN accounts as ac ON f.id_user2 = ac.account_id 
        INNER JOIN account_info as as1 ON f.id_user1 = as1.user_id
        INNER JOIN account_info as as2 ON f.id_user2 = as2.user_id
    WHERE f.id_user1 = '${req.params.id}' OR f.id_user2 = '${req.params.id}'`, (err, result) => {
        for (s of result) {
            s["user1_image_render"] = decodeImage(s["user1_image"])
            s["user2_image_render"] = decodeImage(s["user2_image"])
        }
        res.send(result)
    })
})

// GET USER FRIENDSHIP 
api.post('/getuserfriendship', urlencodedParser, (req, res) => {
    con.query(`SELECT * FROM account_friends WHERE
    id_user1 = ${req.body.user1} AND id_user2 = ${req.body.user2} 
    OR id_user1 = ${req.body.user2} AND id_user2 = ${req.body.user1}`, (err, result) => {
        res.send(result)
    })
})

// CREATE USER FRIENDSHIP
api.post('/sentfriendrequest', urlencodedParser, (req, res) => {
    con.query(`INSERT INTO account_friends(id_user1, id_user2)
    VALUES(${req.body.user1}, ${req.body.user2})`, (err, result) => {
        res.send(result)
    })
})
api.get('/posts', (req, res) => {
    con.query("SELECT * FROM posts INNER JOIN accounts ON posts.post_author_id = accounts.account_id", (err, result) => {
        if (err) throw err
        log("posts", result)
        res.send(result)
    })
})

// CREATE POST
api.post("/createpost", urlencodedParser, (req, res) => {
    console.log(req.body)
})
api.get('/post/:id', (req, res) => {
    if (req.params.id === "notfound") return
    con.query(`SELECT * FROM posts INNER JOIN accounts ON posts.post_author_id = accounts.account_id WHERE post_id = ${req.params.id}`, (err, result) => {
        if (err) throw err
        res.send(result)
        log("post", result)
    })
})

api.get(`/ post /: id / isliked /: accid`, (req, res) => {
    con.query(`SELECT * FROM post_likes WHERE like_post_id = ${req.params.id} AND like_account_id = ${req.params.accid}`, (err, result) => {
        res.send(result)
    })
})

api.get('/post/:id/comments', (req, res) => {
    if (req.params.id === "notfound") return
    con.query(`SELECT * FROM post_comments INNER JOIN accounts ON comment_author_id = accounts.account_id WHERE comment_post_id = ${req.params.id}`, (err, result) => {
        if (err) throw err
        res.send(result)
        log("post comments", result)
    })
})
// GET FRIENDS
api.get('/user/:id/messages', (req, res) => {
    const id = req.params.id
    con.query(`SELECT * FROM account_friends INNER JOIN accounts ON account_friends.id_user1 = accounts.account_id  WHERE id_user1 = ${id} AND id_user2 != ${id} OR id_user2 = ${id} AND id_user2 != ${id}`, (err, result) => {
        res.send(result)
        log("friends", result)
    })
})

// LIKE POST
api.post('/likePost', urlencodedParser, (req, res) => {
    log("LIKE POST", req.body)
    con.query(`SELECT * FROM post_likes WHERE like_post_id = ${req.body.postId} AND like_account_id = ${req.body.accountId}`, (err, result) => {
        console.log(result)
        if (result.length == 0) {
            con.query(`INSERT INTO post_likes(like_post_id, like_account_id) VALUES(${req.body.postId}, ${req.body.accountId})`, (err, result2) => {
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
    con.query(`INSERT INTO posts(post_author_id, post_title, post_content) VALUES
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
    con.query(`INSERT INTO post_comments(comment_post_id, comment_author_id, comment_content) VALUES
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



// API USER
//       - GET USET POSTS
api.get("/user/posts/:id", (res, req) => {
    con.query(`SELECT * FROM posts WHERE post_author_id = ${res.params.id}`, (err, result) => {
        if (err) throw err
        req.send(result)
    })
})

// API POSTS
//     - REGISTER
api.post('/register', urlencodedParser, (req, res) => {
    console.log()
    console.log(req.body)
    // CHECK FOR EMAIL 
    con.query(`SELECT * FROM accounts WHERE account_email = '${req.body.email}' OR account_name = '${req.body.username}'`, (err, result) => {
        // CREATE USER AND SEND DATA BACK
        if (result.length == 0) {
            con.query(`INSERT INTO accounts(account_email, account_name, account_password) VALUES
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

//      - LOGIN 
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




// API TEST
api.post('/postTest', urlencodedParser, function (req, res) {
    req.body.status = "DONE"
    req.body.result = "WORKING"
    res.send(req.body)
})
api.listen(3001)


// EXTENSIONS
const decodeImage = blob => {
    let decodedImage
    if (blob === null || blob.length === 0)
        decodedImage = "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"
    else
        decodedImage = btoa(String.fromCharCode(...new Uint8Array(blob)))
    return `data: image / png; base64, ${decodedImage} `
}