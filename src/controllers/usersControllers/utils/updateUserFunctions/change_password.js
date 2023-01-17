import validator from "validator"
import hashPassword from "../hashPassword.js"
import UserModel from "../../../../Models/UserModel.js"

const change_password = async (req, res) => {
    const username = req.body.jwt_body.username
    const payload = req.body.payload

    if(
        !payload.password ||
        !validator.isStrongPassword(payload.password)
    ) {
        res.status(400).send({ "error": "BAD_DATA" })
        return
    }
    const updates = {
        password: await hashPassword(payload.password)
    }
    try {
        await UserModel.findOneAndUpdate({ username }, updates)
        res.send()
    } 
    catch(err) {
        console.log(err)
        res.status(500).send({
            "error": "SOME_ERROR_OCCURRED"
        })
    }
}

export default change_password