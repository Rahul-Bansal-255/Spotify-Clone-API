import mongoose from "mongoose"
import SongModel from "../../Models/SongModel.js"

const getSpecificSong = async (req, res) => {
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
    
    res.send(song)
}

export default getSpecificSong