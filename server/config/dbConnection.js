const mongoose = require('mongoose')

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGODB_URL)
  console.log(
    `MongoDb connected at: ${connection.connection.host}`.cyan.underline.bold
  )
}

module.exports = connectDB
