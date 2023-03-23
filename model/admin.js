
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const adminschema=new schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerifyed:{
        type:Boolean,
        default:true
    }
})
const adminmodel=new mongoose.model('admin',adminschema)
module.exports=adminmodel;