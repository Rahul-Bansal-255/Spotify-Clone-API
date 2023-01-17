import mongoose from "mongoose"
import UserModel from "../../../../Models/UserModel.js"

const change_playlist_name = async (req, res) => {
    const username = req.body.jwt_body.username
    const payload = req.body.payload

    if(
        !payload.name ||
        !mongoose.isValidObjectId(payload.playlistId) ||
        payload.name.length < 3 ||
        payload.name.length > 50
    ) {
        res.status(400).send({ "error": "BAD_DATA" })
        return
    }
    try {
        await UserModel.findOneAndUpdate(
            { username },
            {
                "$set": {
                    "playlists.$[pId].name": payload.name
                }
            },
            {
                arrayFilters: [{
                    "pId._id": payload.playlistId
                }]
            }
        )
        res.send()
        return
    } catch(err) {
        console.log(err)
        res.status(500).send({
            "error": "SOME_ERROR_OCCURRED"
        })
        return
    }
}

export default change_playlist_name