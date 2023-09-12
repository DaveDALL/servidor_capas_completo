import DAOS from '../dao/daos.factory.js'
const { TicketDAO } = DAOS

const createTicketService = async (cid) => {
    try {
        let ticketCreatedResult = await TicketDAO.createTicket(cid)
        if(ticketCreatedResult) {
            return ticketCreatedResult
        } else {}
    }catch(err) {
        console.log('No fue posible crear el ticket con el servicio ' + err)
        throw new Error('No fue posible crear el ticket con el servicio ')
    }
}