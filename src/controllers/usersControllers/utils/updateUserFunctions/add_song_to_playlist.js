import mongoose from "mongoose"
import UserModel from "../../../../Models/UserModel.js"

const add_song_to_playlist = async (req, res) => {
    const username = req.body.jwt_body.username
    const payload = req.body.payload

    if(
        !mongoose.isValidObjectId(payload.songId) &&
        !mongoose.isValidObjectId(payload.playlistId)
    ) {
        res.status(400).send({ "error": "BAD_DATA" })
        return
    }
    try {
        await UserModel.findOneAndUpdate(
            { username },
            {
                "$push": {
                    "playlists.$[pId].songs": {
                        song: payload.songId
                    }
                }
            },
            {
                arrayFilters: [
                    { "pId._id": payload.playlistId }
                ]
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

export default add_song_to_playlist