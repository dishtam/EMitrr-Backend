import mongoose from "mongoose";
import config from "./utils/environments.js"

const mongoDB = async () =>{
    await mongoose.connect(config.db.URI, { useNewUrlParser: true })
    .then(async ()=>{
        console.log("Connected to database");
        // const fetchData = mongoose.connection.db.collections("questions");
        // const data = await fetchData.find({}).toArray();
        // global.question = data;
    })
    .catch((error)=>{
        console.error('---',error);
    });
}

export default mongoDB;

