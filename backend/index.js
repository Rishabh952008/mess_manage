var express = require('express')
var cors = require('cors');
var app = express();
const port= 7000;


app.use(express.json());
app.use(cors());
const connect_to_mongo = require("./db")
connect_to_mongo();

app.use('/',require('./route/auth'))

app.listen(port,()=>{
    console.log("Backend Started");
})