const express=require("express");
const mysql=require("mysql")
const path=require("path");
const dotenv=require("dotenv");

dotenv.config({ path: './.env' });

const app=express();

const db=mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'nodejs-login',
});
const publicDirectory= path.join(__dirname,'./public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended:false }))
app.use(express.json());
app.set('view engine', 'hbs');
db.connect((error)=>{
    if (error) {
        console.log(error);
    }
    else{
        console.log("MYsql connected..");
    }
})
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));

app.listen(5500 ,()=>{
    console.log("server started on Port 5");
})