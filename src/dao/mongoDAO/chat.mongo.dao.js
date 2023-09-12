import Message from '../../models/message.model.js'

export class MessageMongoDAO {
    constructor () {

    }

    async createMessage (allMessages) {
        try {
            let createdMessage = await Message.create({messages: allMessages})
            if(createdMessage) {
                return createdMessage
            }else throw new Error('Error al crear el Mensaje de Chat en MongoDB')
        }catch(err) {
            console.log('No se pudo crear el mensaje de chat en MongoDB con mongoose ' + err)
            throw new Error('No se pudo crear el mensaje de chat en MongoDB con mongoose ')
        }
    }

    async updateMessage (id, allMessages) {
        try {
            let updatedMessage = await Message.updateOne({_id: id}, {messages: allMessages})
            if(updatedMessage) {
                return updatedMessage
            } else throw new Error ('Error al actualizar los mensajes del chat en MongoDB')
        }catch(err) {
            console.log('No se pudo actualizar el mensaje del chat en MongoDB con mongoose ' + err)
            throw new Error('No se pudo actualizar el mensaje del chat en MongoDB con mongoose ')
        }
    }

}