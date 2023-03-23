
const jwt=require('jsonwebtoken');

exports.authejwt=(req,res,next)=>{
    if (req.cookies && req.cookies.adminToken) {
        jwt.verify(req.cookies.adminToken,'ankan9876554',(err,data)=>{
            req.admin=data
            next()
        })
    } else {
        next()
    }
}