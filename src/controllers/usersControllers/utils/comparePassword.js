import bcrypt from "bcrypt"

const comparePassword = async (password, hash) => {
    const match = await bcrypt.compare(password, hash)
    return match
}

export default comparePassword