
const express=require('express');
const Route=express.Router();
const admincontroller=require('../controller/admincontroller');



Route.get('/admin/register',admincontroller.register);
Route.get('/admin/login',admincontroller.login);
Route.post('/admin/registercreate',admincontroller.register_create);
Route.post('/admin/login/create',admincontroller.login_create);
 Route.get('/admin/dashboard',admincontroller.adminAuth,admincontroller.dashborad);
Route.get('/admin/logout',admincontroller.logout);



module.exports=Route;


