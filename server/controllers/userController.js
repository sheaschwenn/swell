const {User} = require('../models');

module.exports = {
    async getUser(req,res){
       try{
        const userData = await User.findOne({where: {email: req.params.email}})
        .select('-__v')
       if(!userData){
         res.status(400).json({message: "Incorrect email or password"})
         return
        }
        const validatePassword = await userData.isCorrectPassword(req.body.password)
        if(!validatePassword){
            res.status(400).json({message: "Incorrect email or password"})
        }
    }catch(err) {
        res.status(500).json(err)
    }
    }
}