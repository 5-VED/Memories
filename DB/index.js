const { connect } = require("mongoose")

exports.DB_CONNECT = async () => {
    await connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("Connected to the Data Base Successfuly")).catch(err => console.log(err))
}   