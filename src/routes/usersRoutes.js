import express from "express"
import authenticate from "../middleware/authenticate.js"
import usersControllers from "../controllers/usersControllers/index.js"

const usersRoutes = express.Router()

usersRoutes.get('/:username', usersControllers.profile)

usersRoutes.post('/signup', usersControllers.signup)

usersRoutes.post('/login', usersControllers.login)

usersRoutes.patch('/:username', authenticate, usersControllers.updateUser)

export default usersRoutes