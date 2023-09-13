import userService from '../services/user.service.js'
const { getUserByEmailService } = userService

const getUserByEmailController = async (req, res) => {
    let {mail} = req.body
    try{
        let getUserResult = await getUserByEmailService(mail)
        res.status(200).send({status: 'success', payload: getUserResult})
    }catch(err) {
        console.log('No es posible obtener al usuario con el servicio ' + err)
        res.status(204).send({status: 'error', error: 'No es posible obtener al usuario con el servicio '})
    }
}

export default {
    getUserByEmailController
}