import * as dotenv from 'dotenv'
dotenv.config()

import mongoose from "mongoose"


mongoose.set('strictQuery', false) // To remove Deprecation Warning from console

mongoose.connection.on('error', err => {
    console.log(err)
})
mongoose.connection.on('disconnected', () => {
    console.log('Error: database was disconnected')
})

mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log('database connection established')
    })
    .catch((err) => {
        console.log(err)
    })
