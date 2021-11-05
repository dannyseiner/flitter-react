const sql = require("./db.js");
const passwordHash = require("password-hash")

const Account = function (Account) {

};



Account.logIn = (data, result) => {
    sql.query(`SELECT * FROM accounts WHERE account_email = ${data.email}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            if (passwordHash.verify(data.password, res[0].account_password)) {
                result(null, { status: true })
            } else {
                result(null, { status: false })
            }
            return;
        }
        result({ kind: "not_found" }, null);
    });
};


Account.findById = (AccountId, result) => {
    sql.query(`SELECT * FROM accounts WHERE account_id = ${AccountId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Account.findByEmail = (AccountEmail, result) => {
    sql.query(`SELECT * FROM accounts WHERE account_email = ${AccountEmail}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
}

Account.logIn = (logs, result) => {
    sql.query(`SELECT * FROM accounts WHERE account_email = ${logs.email}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            if (passwordHash.verify(logs.password, res[0].account_password)) {
                console.log("SUCCESS!")
            }
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
}

module.exports = Account

