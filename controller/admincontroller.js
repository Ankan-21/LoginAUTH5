
const admin = require('../model/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const register = (req, res) => {
    res.render('./admin/register', {
        message2: req.flash('message2'),
        data:admin.find()

    })
}



const register_create = (req, res) => {
    admin({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save((err, data) => {
        if (!err) {
            console.log("user added successfully...");
            // req.flash('message', "User Register successfully")
            res.redirect('/admin/login');
        } else {
            // req.flash('message2', " Please fill out this field -First Fill up Then Register")
            console.log(err, "user not added");
            res.redirect('/admin/register')
        }
    })
}

const login = (req, res) => {
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('./admin/login', {
        message: req.flash('message'),
        message2: req.flash('message2'),

        data: loginData,
       
    })
}

const login_create = (req, res) => {
    admin.findOne({
        email: req.body.email
    }, (err, data) => {

        if (data) {
            const haspassword = data.password
            if (bcrypt.compareSync(req.body.password, haspassword)) {
                const token = jwt.sign({
                    id: data._id,
                    name: data.name
                }, 'ankan9876554', { expiresIn: '5m' })
                res.cookie('adminToken', token)
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data, "login successfully");
                res.redirect('/admin/dashboard')
            } else {
                // console.log("password incorect");
                req.flash('message2', "Password Incorrect")
                res.redirect('/admin/login')
            }

        } else {
            // console.log("invalid email");
            req.flash('message2', "No User found with thet email")
            res.redirect('/admin/login')
        }
    })
}

const dashborad = (req, res) => {
    if (req.admin) {
        admin.find({}, function (err, userdetails) {
            if (!err) {
                res.render('./admin/dashboard', {
                    data: req.admin,
                    detail: userdetails
                })
            } else {
                console.log(err);
            }
        })
    }

}

const adminAuth = (req, res, next) => {
    if (req.admin) {
        console.log(req.admin);
        next();
    } else {
        console.log(req.admin);
        req.flash('message2', "Can not access this page  -- First login then access this page ")
        res.redirect('/admin/login')
    }
}

const logout = (req, res) => {
    res.clearCookie('adminToken')
    res.redirect('/admin/login')
}

module.exports = {
    
    register,
    register_create,
    login,
    login_create,
    dashborad,
    adminAuth,
    logout
}