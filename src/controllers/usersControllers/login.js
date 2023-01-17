import * as dotenv from 'dotenv'
dotenv.config({ debug: true })

import jwt from "jsonwebtoken"
import validator from "validator"
import UserModel from "../../Models/UserModel.js"
import comparePassword from "./utils/comparePassword.js"

const login = async (req, res) => {
    // checking - format of data
    if(
        !(req.body.username || req.body.email) &&
        !req.body.password &&
        (
            req.body.username ?
            (
                req.body.username.length < 3 ||
                req.body.username.length > 20
            ) :
            !validator.isEmail(req.body.email)
        )
    ) {
        res.status(400).send({
            "error": "BAD_DATA"
        })
        return
    }
    // Accessing and verifying user by username/email
    let user
    if(req.body.username) {
        user = await UserModel.findOne({
            username: req.body.username
        })
        .select({
            username: 1, 
            password: 1
        })
    } else {
        user = await UserModel.findOne({
            email: req.body.email
        })
        .select({
            username: 1, 
            password: 1
        })
    }
    if(!user){
        res.status(400).send({
            "error": "USER_DOES_NOT_EXIST"
        })
        return
    }
    // Verifying password and sending response
    const isAuthenticated = await comparePassword(
        req.body.password,
        user.password
    )
    if(isAuthenticated){
        const token = jwt.sign(
            { username: user.username },
            process.env.SECRET,
            { expiresIn: '2h' }
        )
        user = await UserModel.findOne({
            username: user.username
        })
        .select({
            _id: 0, 
            username: 1, 
            name: 1,
            bio: 1,
            likedSongs: 1, 
            playlists: 1, 
            postedSongs: 1
        })
        .populate("postedSongs.song likedSongs.song playlists.songs.song")

        res.send({user, access_token: token})
    }
    else {
        res.status(400).send({
            "error": "WRONG_PASSWORD"
        })
    }
}

export default login