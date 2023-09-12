import Ticket from '../../models/ticket.model.js'

export class TicketMongoDAO {
    constructor () {

    }
    #idGenerator () {
        return Math.random().toString(16)
    }

    async createTicket (newTicket) {
        try {
            let {amount, purchaser} = newTicket
            if(!amount || !purchaser) {
                throw new Error('Los campos para el ticket no se encuentran completos')
            }else {
                let ticketCreatedResult = await Ticket.create({
                    code: this.#idGenerator(),
                    amount,
                    purchaser
                })
                return ticketCreatedResult
            }
        }catch(err) {
            throw new Error('Error en el DAO, no es posible crear el ticket con mongoose ')
        }
    }
}

