// import mongoose from "mongoose";

// export const dbConnect = async () => {
//     try{
//         const {connecttion} = await mongoose.connect(process.env.MONGO_URI);
//         if(connecttion.readyState === 1){
//             return Promise.resolve(true);
//         }
//     }catch (error){
//         return Promise.reject(error);
//     }
// }


import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
