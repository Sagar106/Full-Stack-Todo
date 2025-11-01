import mongoose from 'mongoose';

const connectDB = async (mongoUri) => {
    try {
        const conn = await mongoose.connect(mongoUri)
        console.log(`MongoDB connected: ${conn.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB