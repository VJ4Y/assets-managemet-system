const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'inventoryDB',
});

connection.connect(err => {
	if (err) {
		console.log(err);
		return err;
	} else {
		console.log('Connect to database');
	}
});
app.use(cors());

// to fetch data from Request Payload
app.use(
	bodyParser.urlencoded({
		extended: true,
	}),
);

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('goto /UserDetails to search user records');
});

app.get('/api/UserDetails', (req, res) => {
	const SELECT_ALL_USER_QUERY = 'select * from UserDetails';
	connection.query(SELECT_ALL_USER_QUERY, (err, result) => {
		if (err) {
			console.log('error');
			return res.send(err);
		} else {
			return res.json({ data: result });
		}
	});
});

// Update a user password
app.put('/api/UserDetails/passUpdate', (req, res) => {
	let passValue = '"' + req.body.password + '"';
	const UPDATE_USER_PASSWORD = `UPDATE UserDetails SET password = ${passValue} WHERE userId = "BadriTraders"`;
	connection.query(UPDATE_USER_PASSWORD, (err, result) => {
		if (err) {
			res.send(err);
		} else {
			res.send('Updated successfully');
		}
	});
});

//get Product Type Details
app.get('/api/getProductTypeDetails', (req, res) => {
	const FETCH_PRODUCT_TYPE = `SELECT * FROM ProductTypeDetails`;
	connection.query(FETCH_PRODUCT_TYPE, (err, result) => {
		if (err) {
			return res.send(err);
		} else {
			return res.json({ data: result });
		}
	});
});

app.listen(8080, () => {
	console.log('Example app listening on port 8080');
});
