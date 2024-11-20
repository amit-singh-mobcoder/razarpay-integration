import mongoose from "mongoose";
import logger from "../logger/winston.logger";

export class DatabaseConnection {
    private _dbName: string;
    private _dbUri: string;

    constructor(name: string, uri: string){
        if(!name || !uri){
            throw new Error('DB_NAME and DB_URI must be provided.')
        }
        this._dbName = name;
        this._dbUri = uri;
    }

    async connect(){
        try {
            const connectionInstance = await mongoose.connect(`${this._dbUri}/${this._dbName}`);
            logger.info(`MongoDB connected sucessfully :: DB-Name: ${connectionInstance.connection.name}`)
        } catch (error) {
            console.error('Error while connecting DB ',error)
            process.exit(1);
        }
    }

    async disconnect(){
        try {
            await mongoose.connection.close();
            console.log('MongoDB connection closed')
        } catch (error) {
            console.error('Error while closing db connection');
        }
    }
}