import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT 
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR 
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY 
export const COOKIE_SECRET = process.env.COOKIE_SECRET 
export const EMAIL_USER= process.env.EMAIL_USER
export const EMAIL_PASSWORD= process.env.EMAIL_PASSWORD


// DATOS ARCHIVO .ENV

// PORT =8080

// MONGODB_CNX_STR =mongodb+srv://pablobrague:12345@cluster0.aqqnq4x.mongodb.net/ecommerce

// COOKIE_SECRET =cookiesecret
// JWT_PRIVATE_KEY =jwtsecret

// EMAIL_USER=braguepablo@gmail.com
// EMAIL_PASSWORD=hobo zomc tjpf nkjt