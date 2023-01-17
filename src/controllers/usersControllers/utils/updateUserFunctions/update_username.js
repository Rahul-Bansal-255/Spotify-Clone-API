import validator from "validator"
import UserModel from "../../../../Models/UserModel.js"

const update_username = async (req, res) => {
    const username = req.body.jwt_body.username
    const payload = req.body.payload

    if(
        !payload.username ||
        !validator.isAlphanumeric(payload.username) ||
        payload.username.length < 3 ||
        payload.username.length > 20
    ) {
        res.status(400).send({ "error": "BAD_DATA" })
        return
    }
    const user = await UserModel.findOne({ username: payload.username })
    if(user) {
        res.status(400).send({ "error": "USERNAME_ALREADY_EXIST" })
        return
    }
    const updates = {
        username: payload.username
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

export default update_username