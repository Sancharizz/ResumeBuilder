import mongoose from "mongoose";
export const connectDB = async () =>
{
    await mongoose.connect('mongodb+srv://sanchari3011_db_user:sanchari1234@cluster0.8tmbj4j.mongodb.net/RESUME')
    .then(() => console.log('DB Connected'))
    
}
