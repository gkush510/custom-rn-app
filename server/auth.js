const dbConnect = require('../db-connection');
const helper = require('../utils/helper');
const path = require('path');
const logPath = path.join(__dirname, '../../logs/error.log');

let getNews = (req, res) => {
    let sql = "SELECT * FROM news";
    console.log("log path ",logPath);
    let funres = helper.insertLog(logPath, "This is just test info");
    try {
        dbConnect.query(sql, function (err, results) {
            if (err) {
                res.json({ news: [], message: `Query failed. Error:${err.sqlMessage}` });
            } else {
                res.json({ news: results, message: "success" });
            }
        });
    } catch (err) {
        if (err instanceof Errors.BadRequest) {
            res.status(HttpStatus.BAD_REQUEST).json({ message: err.message }); // 400
        } else if (err instanceof Errors.Forbidden) {
            res.status(HttpStatus.FORBIDDEN).json({ message: err.message }); // 403
        } else if (err instanceof Errors.NotFound) {
            res.status(HttpStatus.NOT_FOUND).json({ message: err.message }); // 404
        } else if (err instanceof Errors.UnprocessableEntity) {
            res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ message: err.message }); // 422
        } else {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: err, message: err.message });
        }
    }
}


module.exports = (app) => {
    app.get('/', getNews);
}
