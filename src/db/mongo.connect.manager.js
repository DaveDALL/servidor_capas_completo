import mongoose from 'mongoose'
import CONFIG from '../../config/config.env.js'
const { MONGO_URL } = CONFIG

export default {
    connect: async () => {
        return await mongoose.connect(MONGO_URL, {}).then(connection => {
            console.log('DataBase successful connection')
        }).catch(err => console.log('Error at Database connection ' + err))
    }
}