const jwt=require('jsonwebtoken');

exports.authjwt=(req,res,next)=>{
    if (req.cookies && req.cookies.userToken) {
        jwt.verify(req.cookies.userToken,'ankan9876554',(err,data)=>{
            req.user=data
            next()
        })
    } else {
        next()
    }
}