import mongoose from "mongoose"
import SongModel from "../../Models/SongModel.js"
import UserModel from "../../Models/UserModel.js"

const removeSong = async (req, res) => {
    const session = await mongoose.startSession()

    try {
        session.startTransaction()
        
        // Removing the song
        await SongModel.findByIdAndRemove(req.params.songId, { session })
        // Removing the songId from user
        await UserModel.findOneAndUpdate(
            { username: req.body.jwt_body.username },
            { "$pull": { "postedSongs": { song: req.params.songId } } },
            { session }
        )

        await session.commitTransaction()
        
        res.send()
    }
    catch(err) {
        console.log(err)
        res.status(500).send ({
            "error": "SOME_ERROR_OCCURRED"
        })
    }

    await session.endSession()
}

export default removeSong