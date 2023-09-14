import cartService from '../services/carts.service.js'
const {getCartByIdService, newCartService, updateCartService, delProductFromCartService, deleteCartService, purchaseCartService} = cartService

const getCartByIdController = async (req, res) => {
    let {cid} = req.params
    try {
        let cart = await getCartByIdService(cid)
        res.status(200).send({status: 'success', payload: cart})
    }catch(err) {
        console.log('No es posible obtener el cart con el servicio' + err)
        res.status(204).send({status: 'error', error: 'No es posible obtener el cart con mongoose'})
    }
}

const newCartController = async (req, res) => {
    try{
        let cartCreatedResult = await newCartService()
        res.status(200).send({status: 'success', payload: cartCreatedResult})
    }catch(err) {
        console.log('No es posible crear el cart con el servicio ' + err)
        res.status(500).send({status: 'error', error: 'No es posible crear el cart con mongoose'})
    }
}

const updateCartController = async (req, res) => {
    let {cid} = req.params
    let {productId, qty} = req.body
    try {
            let updatedCartResult = await updateCartService(cid, productId, qty)
            res.status(200).send({status: 'success', payload: updatedCartResult})
    }catch(err) {
        console.log('No es posible actualizar el cart con el servicio ' + err)
        res.status(500).send({status: 'error', error: 'No es posible actualizar el cart con mongoose'})
    }
}

const delProductFromCartController = async (req, res) => {
    let {cid, pid} = req.params
    try {
        let updatedCartResult = await delProductFromCartService(cid, pid)
        res.status(200).send({status: 'success', payload: updatedCartResult})
        
    }catch(err) {
        console.log('No es posible borrar el producto con el servicio ' + err)
        res.status(500).send({status: 'error', error: 'No es posible borrar el producto mediante mongoose'})
    }
}

const deleteCartController = async (req, res) => {
    let {cid} = req.params
    try {
        let deletedCartResult = await deleteCartService(cid)
        res.status(200).send({status: 'success', payload: deletedCartResult})
    }catch(err) {
        console.log('No es posible borrar el cart con el servicio '+ err)
        res.status(500).send({status: 'error', error: 'No es posible borrar el cart mediante mongoose'})
    }
}

const purchaseCartController = async (req, res) => {
    let {cid} = req.params
    try{
        let userByCart = await purchaseCartService(cid)
        res.status(200).send({status: 'success', payload: userByCart})
    }catch(err) {
        console.log(err)
    }
}


export default {
    getCartByIdController,
    newCartController,
    updateCartController,
    delProductFromCartController,
    deleteCartController,
    purchaseCartController
}
