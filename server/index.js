// TEST
const express = require("express")
const bodyParser = require("body-parser")
// MODAL
const Account = require("./app/model/account")
const Post = require("./app/model/post")
const app = express();
const cors = require("cors")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// INIT
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." })
});


// USER ROUTES
app.get('/user/:id', (req, res) => {
    Account.findById(req.params.id, (err, usr) => res.send(usr))
})

app.post('login', (req, res) => {
    console.log(req.body)
    Account.logIn(req.body, (err, state) => res.send(state))
})

// POST ROUTES
app.get('/posts', (req, res) => {
    Post.getAll((err, post) => res.send(post))
})
app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => res.send(post))
})



// set port, listen for requests
app.listen(3001, () => console.log("Server is running on port {3001}."))





