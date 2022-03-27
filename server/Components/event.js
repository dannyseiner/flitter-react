const config = require("../config.json")
const mysql = require('mysql')
const con = mysql.createConnection(config)
con.connect(function (err) {
    if (err) throw err
    console.log("DB - ONLINE")
})

exports.getEvent = () => {
    con.query("SELECT * FROM events INNER JOIN accounts ON events.author_id = accounts.account_id", (err, result) => {
        return result
    })
}