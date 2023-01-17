import UserModel from "../../../../Models/UserModel.js"

const update_user_details = async (req, res) => {
    const username = req.body.jwt_body.username
    const payload = req.body.payload

    if(
        (
            payload.name ?
            (
                payload.name.length < 3 ||
                payload.name.length > 20
            ) :
            false
        ) ||
        (
            payload.bio ?
            payload.bio.length > 5000 :
            false
        )
    ) {
        res.status(400).send({ "error": "BAD_DATA" })
        return
    }

    const updates = {
        name: ( payload.name ? payload.name : undefined ),
        bio: ( payload.bio ? payload.bio : undefined )
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

export default update_user_details