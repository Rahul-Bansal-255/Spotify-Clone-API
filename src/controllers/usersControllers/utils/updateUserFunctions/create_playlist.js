import UserModel from "../../../../Models/UserModel.js"

const create_playlist = async (req, res) => {
    const username = req.body.jwt_body.username
    const payload = req.body.payload

    if(
        !payload.name ||
        payload.name.length < 3 ||
        payload.name.length > 50
    ) {
        res.status(400).send({ "error": "BAD_DATA" })
        return
    }
    const updates = {
        "$push": {
            "playlists": {
                name: payload.name
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

export default create_playlist