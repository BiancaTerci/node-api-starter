import {MongoClient,Db} from 'mongodb'
import 'dotenv/config'

let dbConnection:Db;

export function connectToDb(cb:(msg:string|null)=>void){
    //recieves a connectionString, it is an async func
    MongoClient.connect(process.env.CONNECTION_STRING!)
    .then((client)=>{
        //client=conexiunea pe care am initializat-o
        dbConnection=client.db();
        return cb(null)
    }).catch((err:string)=>{
        console.log(err);
        return cb(err);
    });

}
export function getDb():Db{
    return dbConnection;
}

