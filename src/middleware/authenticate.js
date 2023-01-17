import jwt from "jsonwebtoken"

// In this middleware we check if user is logged in or not

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]
    if(!token) {
        res.status(401).send({
            "error": "AUTHENTICATION_FAILED"
        })
        return
    }
    try{
        const jwt_body = jwt.verify(token, process.env.SECRET)
        req.body.jwt_body = jwt_body
    } catch(err) {
        console.log(err)
        res.status(401).send({
            "error": "AUTHENTICATION_FAILED"
        })
        return
    }
    next()
}

export default authenticate