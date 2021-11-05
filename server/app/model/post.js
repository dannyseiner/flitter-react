const sql = require("./db.js");


const Post = function (Post) {

};

Post.getAll = (result) => {
    sql.query(`SELECT * FROM posts`, (err, res) => {
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
Post.findById = (PostId, result) => {
    sql.query(`SELECT * FROM posts WHERE post_id= ${PostId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, { result: null });
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        } else {
            result(null, { status: 404 });
        }
    });
};


module.exports = Post

