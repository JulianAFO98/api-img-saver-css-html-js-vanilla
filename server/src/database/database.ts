import { Client } from 'pg';

let clientInstance: Client;

const connectDB = async (): Promise<Client> => {
    if (!clientInstance) {
        clientInstance = new Client({
            user: process.env.USER,
            password: process.env.DB_PASSWORD,
            host: process.env.HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
        });

        try {
            await clientInstance.connect();
            console.log("Database connected");
        } catch (err) {
            console.error("Database connection error:", err);
        }
    }
    return clientInstance;
};


export default connectDB;