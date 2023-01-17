import SongModel from "../../Models/SongModel.js"

const getSongs = async (req, res) => {
    try{
        const SONGS_PER_PAGE = 30
        const count = await SongModel.find().count()
        const maxPages = Math.floor( (count / SONGS_PER_PAGE) + 1 )
        const page = (
                req.query.page &&
                req.query.page > 0
            ) ?
            (
                req.query.page <= maxPages  ? 
                req.query.page : 
                maxPages
            ) : 
            1

        const latest = (
            req.query.latest && req.query.latest == "true" ?
            true :
            false
        )

        const songs = await SongModel.find()
            .sort({ createdAt: (latest ? -1 : undefined) })
            .skip(( page - 1 ) * SONGS_PER_PAGE)
            .limit(SONGS_PER_PAGE)

        res.send(songs)
    }
    catch(err) {
        console.log(err)
        res.status(500).send({
            "error": "SOME_ERROR_OCCURRED"
        })
    }
}

export default getSongs