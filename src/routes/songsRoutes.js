import express from "express"
import authenticate from "../middleware/authenticate.js"
import authorize from "../middleware/authorize.js"
import songsControllers from "../controllers/songsControllers/index.js"

const songsRoutes = express.Router()

songsRoutes.get('/', songsControllers.getSongs)

songsRoutes.get('/:songId', songsControllers.getSpecificSong)

songsRoutes.post('/', authenticate, songsControllers.addSong)

songsRoutes.patch('/:songId', authenticate, authorize, songsControllers.updateSong)

songsRoutes.delete('/:songId', authenticate, authorize, songsControllers.removeSong)

export default songsRoutes



//pagination - query params