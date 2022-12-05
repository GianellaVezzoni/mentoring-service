import configs from "../configs"
const mongoose = require('mongoose')

const ConnectToDatabase = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(configs.api.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch((error: any) => console.log('Ocurrio un error', error))
    const connection = mongoose.connection

    connection.once('open', () => console.log('Base de datos conectada', configs.api.uri))
}

export default ConnectToDatabase