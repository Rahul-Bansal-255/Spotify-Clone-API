import mongoose from "mongoose"
import SongModel from "../Models/SongModel.js"

// In this middleware we check if user wants 
// to update a song then that song should have been created
// by that user, he/she should not be able to manipulate
// some other users song

const authorize = async (req, res, next) => {
    const username = req.body.jwt_body.username
    const songId = req.params.songId

    if(!mongoose.isValidObjectId(songId)){
        res.status(400).send({
            "error": "SONG_DOES_NOT_EXIST"
        })
        return
    }
    
    const song = await SongModel.findById(songId)

    if(!song) {
        res.status(400).send({
            "error": "SONG_DOES_NOT_EXIST"
        })
        return
    }

    if(song.username != username){
        res.status(400).send({
            "error": "AUTHORIZATION_FAILED"
        })
        return
    }

    next()
}

export default authorize