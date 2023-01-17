import mongoose from "mongoose"

const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 100
    },
    description: {
        type: String,
        required: true,
        maxLength: 1000
    },
    username: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const SongModel = mongoose.model('song', SongSchema)

export default SongModel
