import User from '../../models/users.model.js'

export class UserMongoDAO {

    constructor() {

    }

    async createUser (user) {
        try {
            let createdUser = await User.create(user)
            if(createdUser) {
                return createdUser
            }else return {}
        }catch(err) {
            console.log('No se pudo crear el usuario en MongoDB con mongoose ' + err)
            throw new Error('No se pudo crear el usuario en MongoDB con mongoose ')
        }
    }

    async getUserByEmail (userMail) {
        try {
            let foundUser = await User.find({userMail: userMail})
            if(foundUser.length > 0) {
                return foundUser
            }else return []
        }catch(err) {
            console.log('No se pudo confirmar el usuario en MongoDB con mongoose ' + err)
            throw new Error('No se pudo confirmar el usuario en MongoDB con mongoose ')
        }
    }

    async addCartToUser (mail, cid) {
        try {
            if(!mail || !cid) throw new Error('Los parametros para actualizar el usuario no estan completos')
            let userCartUpdated = await User.updateOne({userMail: mail}, {$push: {userCart: {cartId: cid}}})
            return userCartUpdated
        }catch(err) {
            throw new Error('No es posible agregar el carrito al usuario con mongoose ' + err)
        }
    }

}