import mongoose from "mongoose"
import UserModel from "../../../../Models/UserModel.js"

const add_like = async (req, res) => {
    const username = req.body.jwt_body.username
    const payload = req.body.payload

    if(!mongoose.isValidObjectId(payload.songId)) {
        res.status(400).send({ "error": "BAD_DATA" })
        return
    }
    const updates = {
        "$push": {
            "likedSongs": {
                song: payload.songId
            }
        }
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

export default add_like