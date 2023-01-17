import SongModel from "../../Models/SongModel.js"

const updateSong = (req, res) => {
    // Checking - data format
    if(
        !(req.body.name || req.body.description) ||
        !(
            req.body.name ?
            req.body.name.length < 101:
            true
        ) ||
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
    // creating JSON for fields to update
    const song = {
        name: (
            req.body.name ?
            req.body.name :
            undefined
        ),
        description: (
            req.body.description ?
            req.body.description :
            undefined
        )
    }
    // Updating song
    SongModel.findOneAndUpdate(
        {_id: req.params.songId},
        song,
        {new: true}
        )
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                "error": "DATA_UPDATION_FAILED"
            })
        })
}

export default updateSong