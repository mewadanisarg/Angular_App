const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


// database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simpledb',
    port: 3306,
})

//check database connection

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// get all data

app.get('/user', (req, res) => {

    let qr = `select * from user`;
    db.query(qr, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                message: 'all user data',
                data: result
            });
        }
    });
    console.log("get users!");
});

// get single data



app.get('/user/:id', (req, res) => {
    let id = req.params.id;
    let qr = `select * from user where id = ${id}`;
    db.query(qr, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                message: 'single user data',
                data: result,
            },
            );
        } else {
            res.send({
                message: 'user not found',
                data: result
            });
        }
    });
    console.log("get single user!");
});

// insert data

app.post('/user', (req, res) => {
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mb = req.body.mobile;
    let qr = `insert into user (fullname,email,mobile) values ('${fullname}','${email}','${mb}')`;
    db.query(qr, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                message: 'user inserted',
                data: result
            });
        } else {
            res.send({
                message: 'user not inserted',
            });
        }
    });
    console.log("insert user!");
});

//update data

app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let fullname = req.body.fullname;
    let email = req.body.email;
    let mb = req.body.mobile;
    let qr = `update user set fullname = '${fullname}',email = '${email}',mobile = '${mb}' where id = ${id}`;
    db.query(qr, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                message: 'user updated',
                data: result
            });
        } else {
            res.send({
                message: 'user not updated',
            });
        }
    });
    console.log("update user!");
});

//delete data

app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let qr = `delete from user where id = ${id}`;
    db.query(qr, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({
                message: 'user deleted',
                data: result
            });
        } else {
            res.send({
                message: 'user not deleted',
            });
        }
    });
    console.log("delete user!");
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});



