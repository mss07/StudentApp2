import mongoose from "mongoose";


export const Connection = async (username,password) => {
    const URL=`mongodb+srv://${username}:${password}@website2.i6je5qx.mongodb.net/?retryWrites=true&w=majority&appName=website2`;
  
    try{
       await mongoose.connect(URL);
       console.log("Database connected successfully");
    } catch (error){
        console.log("Error while conneting with mongodb",error.message);
    }
  
}

