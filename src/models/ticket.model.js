import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        tyte: Number,
        required:true,
    },
    purchaser: {
        type: String,
        required:true
    },
    timestamps: {
        createdAt: 'purchaseDate',
        updatedAt: false
    }
    
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket