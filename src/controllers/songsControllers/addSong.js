import mongoose from "mongoose"
import SongModel from "../../Models/SongModel.js"
import UserModel from "../../Models/UserModel.js"

const addSong = async (req, res) => {
    // Checking - data format
    if(
        !(req.body.name && req.body.name.length < 101) ||
        !(
            req.body.description ?
            req.body.description.length < 1001 :
            true
        )
    ){
        res.status(400).send({
            "error": "BAD_DATA"
        })
        return
    }

    const session = await mongoose.startSession()

    try {
        session.startTransaction()

        // Creating new song and saving it
        const song = await SongModel.create([{
            name: req.body.name,
            description: (
                req.body.description ?
                req.body.description :
                undefined
            ),
            username: req.body.jwt_body.username
        }], { session })
        // Adding songId to creator
        await UserModel.findOneAndUpdate(
            { username: req.body.jwt_body.username },
            { "$push": { "postedSongs": { song: song[0]._id } } },
            { session }
        )

        await session.commitTransaction()

        res.status(201).send(song)
    }
    catch(err) {
        console.log(err)
        res.status(500).send({
            "error": "DATA_INSERTION_FAILED"
        })
    }

    session.endSession()
}

export default addSong