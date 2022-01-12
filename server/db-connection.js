const mysql = require('mysql');
// let dbConnection = new Promise(async (resolve, reject) => {
//     const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'reactmysql' });
//     let error = "";
//    let a =  await connection.connect((err) => {
//         if (err) { 
//             error = err;
//             reject(err);
//         }else{
//             resolve(connection)
//         }
//     });
//     console.log("dbConnection  ",a);
//     if(error ==""){
//         resolve(connection);
//     }else{
//         reject(err);
//     }
// });

// const dbConnect = dbConnection.then(function (result) {
//     return result;
// }).catch(function (error) {
//     return error;
// });
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: '', database: 'ppe_chatbox' });
connection.connect((err) => {
    if (err) {
        console.log("Error in Connecting DB", err);
    } else {
        console.log("Succesfully connected to DB");
    }
});
//console.log("dbConnect mysql ",connection);
module.exports = connection;
