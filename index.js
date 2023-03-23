const express=require('express');
const mongoose=require('mongoose');
const cookieparser=require('cookie-parser')
const userAuth=require('./middleware/userAuth');
const adminAuth= require('./middleware/adminAuth')
const session=require('express-session')
const flash=require('connect-flash');

const app=express();


const port=process.env.PORT || 4987;

app.use(express.urlencoded({extended:true}));

app.use(flash());
app.use(cookieparser());
app.use(session({
    cookie:{maxAge:5000},
    secret:'souvik',
    resave:false,
    saveUninitialized:false
}))

app.set('view engine','ejs');
app.set('views','views')

app.use(userAuth.authjwt)
app.use(adminAuth.authejwt)
const userroute=require('./routes/userRoute')
app.use(userroute)

const adminroute=require('./routes/adminRoute')
app.use(adminroute)

const DB="mongodb+srv://ankandb:vnkhSzkCKB5LXe20@cluster0.jmt30c3.mongodb.net/ath"
mongoose.connect(DB,({useNewUrlParser:true,useUnifiedTopology:true}))
.then(result=>{
    app.listen(port,()=>{
        console.log("DB Connected....");
        console.log(`server running http://localhost:${port}`);
    })
}).catch(err=>{
    console.log(err);
})