const {User}=require('../model/user')

const authenticateUser=function(req,res,next){
    const token=req.header('x-auth')
    console.log(token)
    console.log("inside the authenticate")
    User.findByToken(token)
    .then(user=>{
        if(user){
            req.user=user
            console.log("inside middleware")
            req.token=token
            next()
        }else{
            res.status('401').send({notice:'token not available'})
        }
    })
    .catch(err=>{
        res.status('404').send(err)
    })
}
module.exports={authenticateUser}