import DAOS from '../dao/daos.factory.js'
const { UserDAO } = DAOS

const addCartToUserService = async (mail, cid) => {
    try {
        let addCartToUserResult = await UserDAO.addCartToUser(mail, cid)
        if(addCartToUserResult) {
            return addCartToUserResult
        } else return {}
    }catch(err) {
        console.log('Error al agregar el cart al usuario '+ err)
        throw new Error('Error al agregar el cart al usuario ')
    }
}

export default {
    addCartToUserService
}