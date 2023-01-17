import UserModel from "../../Models/UserModel.js"

const profile = async (req, res) => {
    // checking - format of data
    if(
        !req.params.username ||
        req.params.username.length < 3 ||
        req.params.username.length > 20
    ) {
        res.status(400).send({
            "error": "USER_DOES_NOT_EXIST"
        })
        return
    }

    // fetching data and sending response
    try{
        const user = await UserModel.findOne({
            username: req.params.username
        })
        .select({
            _id: 0, 
            username: 1, 
            name: 1,
            bio: 1,
            postedSongs: 1
        })
        .populate("postedSongs.song")
        if(user) {
            res.send(user)
        }
        else {
            res.status(400).send({
                "error": "USER_DOES_NOT_EXIST"
            })
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).send({
            "error": "SOME_ERROR_OCCURRED"
        })
    }
}

export default profile