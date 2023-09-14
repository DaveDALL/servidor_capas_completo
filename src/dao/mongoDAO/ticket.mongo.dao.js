import Ticket from '../../models/ticket.model.js'

export class TicketMongoDAO {
    constructor () {

    }
    #idGenerator () {
        return Math.random().toString(16)
    }

    async createTicket (products, amount, purchaser) {
        try {
            if((products.length <= 0) || !amount || !purchaser) {
                throw new Error('Los campos para el ticket no se encuentran completos')
            }else {
                let ticketCreatedResult = await Ticket.create({
                    code: this.#idGenerator(),
                    buyedProducts: products,
                    amount,
                    purchaser
                })
                return ticketCreatedResult
            }
        }catch(err) {
            throw new Error('Error en el DAO, no es posible crear el ticket con mongoose ')
        }
    }

    async getTicketbyId (tid) {
        try {
            let ticket = await Ticket.findOne({"_id": tid})
            if(ticket) {
                return ticket
            }else throw new Error('No existe el ticket en MongoDB ')
        }catch(err) {
            throw new Error('No es posible obetener el ticket de MongoDB con mongoose ')
        }
    }
}

