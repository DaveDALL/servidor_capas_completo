import productService from '../services/products.service.js'
const {conditionalSearchProductsService, searchProductByIdService, newProductService, productUpdateService, deleteProductService} = productService

const conditionalSearchProductsController = async (req, res) => {
    let conditions = req.query
    try {
        let requiredProducts = await conditionalSearchProductsService(conditions)
        let {totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage} = requiredProducts
        let prevPageLink = (prevPage ? (req.protocol + '://' + req.get('host') + req.originalUrl.replace(`pageNum=${page}`, `pageNum=${Number(page) - 1}`)) : null)
        let nextPageLink = (nextPage ? (req.protocol + '://' + req.get('host') + req.originalUrl.replace(`pageNum=${page}`, `pageNum=${Number(page) + 1}`)) : null)

        res.status(200).send({
            status: 'success',
            payload: requiredProducts.docs,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: prevPageLink,
            nextLink: nextPageLink
        })
    }catch(err) {
        console.log('No es posible obtener los productos desde el servicio de productos ' + err)
        res.status(500).send({status: 'error', error: 'No es posible obtener productos con mongoose'})
    }
}

const searchProductByIdController = async (req, res) => {
    let {pid} = req.params
    try {
        let foundProduct = await searchProductByIdService(pid)
            if(foundProduct) {
                res.status(200).send({status: 'success', payload: foundProduct})
            } else return res.status(204).send({status: 'error', error: 'No existe el producto en la base de datos'})
        }catch(err) {
         console.log('No es posible obtener el producto con mongoose' + err)
         res.status(500).send({status: 'error', error: 'No es posible obtener el producto con mongoose'})
    }
}

const newProductController = async (req, res) => {
    let newProduct = req.body
    try {
        let createdProductResult = await newProductService(newProduct)
        res.status(200).send({status: 'success', payload: createdProductResult})
    }catch(err) {
        console.log('No es posible crear el producto' + err)
        res.status(500).send({status: 'error', error: 'No es posible crear el producto con el servicio'})
    }
    
}

const productUpdateController = async (req, res) => {
    let productToUpdate = req.body
    try {
        let productUpdatedResult = await productUpdateService(productToUpdate)
        res.status(200).send({status:'success', payload: productUpdatedResult})
    }catch(err) {
        console.log('No es posible actualizar el producto con el servicio ' + err)
        res.status(500).send({status: 'error', error: 'No es posible actualizar el producto con mongoose'})
    }
}

const deleteProductController = async (req, res) => {
    let {pid} = req.params
    try {
        let productDeletedResult = await deleteProductService(pid)
        res.status(200).send({status: 'success', payload: productDeletedResult})
    }catch(err) {
        console.log('No es posible eliminar el producto con el servicio ' + err)
        res.status(500).send({status: 'error', error: 'No es posible eliminar el producto con mongoose'})
    }
}

export default {
    conditionalSearchProductsController,
    searchProductByIdController,
    newProductController,
    productUpdateController,
    deleteProductController
}