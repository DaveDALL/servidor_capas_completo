import DAOS from '../dao/daos.factory.js'
const { CartDAO } = DAOS

const getCartByIdService = async (cid) => {
    try {
        let cart = await CartDAO.getCartById(cid)
        if(cart){
            return cart
        }else return {}
    }catch(err) {
        console.log('Error al obtener el cart ' + err)
        throw new Error('Error al obtener el cart ')
    }
}

const newCartService = async () => {
    try{
        let cartCreatedResult = await CartDAO.createCart()
        if(cartCreatedResult) {
            return cartCreatedResult
        }else return {}
    }catch(err) {
        console.log('Error al crear el cart ' + err)
        throw new Error('Error al crear el cart ')
    }
}

const updateCartService = async (cid, productId, qty) => {
    try {
        let updatedCartResult = await CartDAO.updateCartById(cid, productId, qty)
        if(updatedCartResult) {
            return updatedCartResult
        }else return {}
    }catch(err) {
        console.log('Error al actualizar el cart ' + err)
        throw new Error('Error al actualizar el cart ')
    }
}

const delProductFromCartService = async (cid, pid) => {
    try {
        let deletedProductResult = await CartDAO.deleteProductFromCart(cid, pid)
        if(deletedProductResult) {
            return deletedProductResult
        }else return {}
    }catch(err) {
        console.log('Error borrar el producto del Cart ' + err)
        throw new Error('Error borrar el producto del Cart ')
    }
}

const deleteCartService = async (cid) => {
    try {
        let deletedCartResult = await CartDAO.deleteCartbyId(cid)
        if(deletedCartResult) {
            return deletedCartResult
        }else return {}
    }catch(err) {
        console.log('No es posible borrar el cart con mongoose '+ err)
    }
}

export default {
    getCartByIdService,
    newCartService,
    updateCartService,
    delProductFromCartService,
    deleteCartService
}