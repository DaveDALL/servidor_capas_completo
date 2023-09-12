import userService from '../services/user.service.js'
const { addCartToUserService } = userService

const addCartToUserController = async (req, res) => {
    let {mail, cid} = req.body
    console.log(mail, cid)
    try{
        let addCartToUserResult = addCartToUserService(mail, cid)
        res.status(200).send({status: 'success', payload: addCartToUserResult})
    }catch(err) {
        console.log('No es posible agregar el cart al usuario con el servicio ' + err)
        res.status(204).send({status: 'error', error: 'No es posible agregar el cart al usuario con el servicio '})
    }
}

export default {
    addCartToUserController
}