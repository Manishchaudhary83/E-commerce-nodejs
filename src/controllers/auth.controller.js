const {registerUser, loginUser} = require("../services/auth.service")

module.exports = {
    registerUserController : async(req, res, next) => {
        try{
            const data = req.body
            
            const result = await registerUser(data)

            return res.status(result.status).json({
                message: result.message,
                user: result.user

            })

        }
        catch(error){
            console.log("Error is ", error)
            return next(error)
        }
    },

    //login controller
    loginUserController: async (req, res, next) => {
            try {
    
                console.log("REQ BODY:", req.body)
                const data = req.body
            
    
                const result = await loginUser(data)
    
    
                return res.status(200).json({
                    message: result.message,
                    status: result.status,
                    token: result.token,
                    user: result.user
                })
            }
            catch (error) {
                return next(error)
            }
    
    
        }
}