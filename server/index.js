const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const port = process.env.PORT || 8001;
const app = express();
//app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
	//console.log("index .req ",req );
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-type,Origin,Accept,x-access-token,X-Key');
	if (req.method == 'OPTIONS') {
		res.status(200).end();
	} else {
		next();
	}
});

const userRouter = require("./api/users/user.router");
app.use(bodyParser.json());
app.use("/api/users", userRouter);
app.listen(port, () => {
	console.log(`listening to the port no at ${port}`);
	//console.log(`dbConnect ${dbConnect}`);
});

//https://www.youtube.com/watch?v=WfCJ3sHnLBM
//https://github.com/hocwebchuan/React-and-MySQL