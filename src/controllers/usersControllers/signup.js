import validator from "validator"
import hashPassword from "./utils/hashPassword.js"
import UserModel from "../../Models/UserModel.js"

// format of data will be verified in fontend
// checks here are just to protect from hackers
// and be doubly sure

const signup = async (req, res) => {
    // checking - format of data
    if(
        !req.body.name ||
        !req.body.username ||
        !req.body.email ||
        !req.body.password ||
        req.body.name.length < 3 ||
        req.body.name.length > 20 ||
        !validator.isAlphanumeric(req.body.username) ||
        req.body.username.length < 3 ||
        req.body.username.length > 20 ||
        !validator.isEmail(req.body.email) ||
        !validator.isStrongPassword(req.body.password)
    ) {
        res.status(400).send({
            "error": "BAD_DATA"
        })
        return
    }
    // verifying - username is unique
    const verifyUsername = await UserModel.findOne({username: [req.body.username]})
        if(verifyUsername){
            res.status(400).send({
                "error": "USERNAME_ALREADY_EXIST"
            })
            return
        }
    // verifying - email is unique
    const verifyEmail = await UserModel.findOne({email: [req.body.email]})
        if(verifyEmail){
            res.status(400).send({
                "error": "EMAIL_ALREADY_EXIST"
            })
            return
        }
    // hashing - password & appending data to DB
    const hash = await hashPassword(req.body.password)
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        name: req.body.name
    })
    try{
        newUser.save()
    }
    catch(err) {
        console.log(err)
        res.status(500).send({
            "error": "SOME_ERROR_OCCURRED"
        })
        return
    }
    res.status(201).send()
}

export default signup