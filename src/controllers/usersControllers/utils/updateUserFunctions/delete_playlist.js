import mongoose from "mongoose"
import UserModel from "../../../../Models/UserModel.js"

const delete_playlist = async (req, res) => {
    const username = req.body.jwt_body.username
    const payload = req.body.payload

    if(!mongoose.isValidObjectId(payload.playlistId)) {
        res.status(400).send({ "error": "BAD_DATA" })
        return
    }
    const updates = {
        "$pull": {
            "playlists": {
                _id: payload.playlistId
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

export default delete_playlist