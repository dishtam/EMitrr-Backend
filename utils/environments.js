import dotenv from "dotenv";

dotenv.config();

const config = {
    PORT: process.env.PORT,
    db: {
        URI: process.env.MONGO_URI,
    },
    SECRET: process.env.JWT_SECRET,
};

export default config;
