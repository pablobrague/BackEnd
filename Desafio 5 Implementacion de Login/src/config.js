import crypto from 'crypto'

export const PORT = 8080
export const MONGODB_STR_CNX = 'mongodb+srv://pablobrague:12345@cluster0.aqqnq4x.mongodb.net/sessions'
export const MONGODB_STR_CNX_DB = 'mongodb+srv://pablobrague:12345@cluster0.aqqnq4x.mongodb.net'
export function createSalt () {
    return crypto.randomBytes(128).toString('base64')
}

export const encriptedString = (salt, pass) => {
    return crypto.createHmac('sha256', salt).update(pass).digest('hex')
}
