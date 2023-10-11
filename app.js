const express = require("express");
const cors = require("cors")
const { DB_CONNECT } = require("./DB/index")
require("dotenv").config()

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{explorer:true}));

app.use('/api/v1', require('./Router/user.routes'))
app.use('/api/v1', require('./Router/memories.routes'))


const start = async () => {

    await DB_CONNECT()
    app.listen(process.env.PORT)
}

start().then(() => console.log(`Server is Spinning at Port ${process.env.PORT}`))
    .catch(error => console.log('Some Error Occured ===>', error))



