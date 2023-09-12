import authService from '../services/auth.service.js'
const {authRegistrationService, authLoginService} = authService

const authRegistrationController = async (req, res) => {
    let user = req.body
    try {
        await authRegistrationService(user)
        res.redirect('/')
        
    }catch(err) {
        console.log('No se pudo crear el usuario con el servicio ' + err)
    }
}

const authLoginController = async (req, res) => {
    let user = req.body
    try {
        let userInfo = await authLoginService(user)
        let {token, foundUser} = userInfo
        if(userInfo) {
            req.session.userMail = foundUser.userMail
            req.session.userName = foundUser.userName
            req.session.lastName = foundUser.lastName || ' '
            req.session.userRoll = foundUser.userRoll
            res.cookie('jwtCookie', token).redirect('/products')
        }else res.redirect('/')
    }catch(err) {
        console.log('No se pudo confirmar el usuario con mongoose ' + err)
        res.redirect('/userRegistration')
    }
}

export default {
    authRegistrationController,
    authLoginController
}