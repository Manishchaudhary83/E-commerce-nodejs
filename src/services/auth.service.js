const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")

module.exports = {

    //register
    registerUser : (data) => { 
       
            return new Promise( async (resolve, reject)=> {

                try{
            
                const {fullName, username, email, password, isAdmin} = data

                const isUserAlreadyExists = await userModel.findOne({$or: [{email}, {username}]})

                if(isUserAlreadyExists){
                    return reject({
                        message: "user already exists",
                        status: 422
                    })
                }

                const hashPassword = await bcrypt.hash(password, 10)

                const user = await userModel.create({
                    fullName,
                    username,
                    email,
                    password:hashPassword,
                    isAdmin: isAdmin || false
                })


                return resolve({
                    message: "Usecreated successfully",
                    status: 201,
                    user:{
                        id: user._id,
                        fullName: user.fullName,
                        username: user.username,
                        email: user.email,
                    }
                })
            }
        catch(error){
            console.log("Error is", error)
            return reject({
                message: "Server error",
                satus: 500
            })
        }
        })
    },


    //login
    loginUser: (data) => {
        return new Promise(async(resolve, reject)=> {
        
            try{
                const {username, email, password} = data

               const user = await userModel.findOne({
                $or: [
                    {username},
                    {email}
                ]
               })

               if(!user){
                return reject({
                    message: "Invalid credentials",
                    status: 401
                })
               }

               const isValidpassword = await bcrypt.compare(password, user.password)


                if (!isValidpassword) {
                    return reject({
                        message: "Invalid credentials",
                        status: 401
                    })
                }

            //generate token
            const token = generateToken(user)


             return resolve({
                    message: "login successful",
                    status: 200,
                    token: token,
                    user: {
                        id: user._id,
                        fullName: user.fullName,
                        email: user.email,
                        username: user.username,
                        isAdmin: user.isAdmin
                    }
                })

            }
            catch(error){
                return reject({
                    message: "internal server error",
                    status: 500
                })
            }
        } )
    }
}
