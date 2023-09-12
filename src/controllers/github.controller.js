import jwt from 'jsonwebtoken'
import config from '../../config/config.env.js'
const { SECRET } = config

const githubController = async (req, res) => {
    try {
        let {userMail, userName, lastName, userRoll} = await req.user
        req.session.userMail = userMail
        req.session.userName = userName
        req.session.lastName = lastName || ' '
        req.session.userRoll = userRoll
        let token = jwt.sign({email: userMail}, SECRET, {expiresIn:'24h'})
        if(token) return token 
        else throw new Error('No fue posible autentificar con guthub')
    }catch(err) {
        console.log('No fue posible autentificar con github' + err)
    }
}

export default {
    githubController
}