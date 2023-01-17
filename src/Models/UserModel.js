import mongoose from "mongoose"
import validator from "validator"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 20
    },

    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 200,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },

    password: {
        type: String,
        required: true
    },
    
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },

    bio: {
        type: String,
        maxLength: 5000
    },

    likedSongs: [{
        _id: false,
        song: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'song'
        },
        PLACE_HOLDER: {
            type: Boolean,
            default: true
        }
    }],

    playlists: [{
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 50
        },
        songs: [{
            _id: false,
            song: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'song'
            },
            PLACE_HOLDER: {
                type: Boolean,
                default: true
            }
        }]
    }],

    postedSongs: [{
        _id: false,
        song: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'song'
        },
        PLACE_HOLDER: {
            type: Boolean,
            default: true
        }
    }]
})

const UserModel = mongoose.model('user', UserSchema)

export default UserModel
