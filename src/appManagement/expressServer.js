import express from "express"
import usersRoutes from "../routes/usersRoutes.js"
import songsRoutes from "../routes/songsRoutes.js"

const EXPRESS_PORT = 4000
const app = express()
app.listen(EXPRESS_PORT, () => {
    console.log('listening to PORT: 4000')
})

app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/songs', songsRoutes)

app.use((req, res) => {
    res.status(404).send()
})
