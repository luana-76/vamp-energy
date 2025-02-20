import { MongoClient } from "mongodb";

const URL = "mongodb+srv://luanamaria2003:8ODAi7dkCBV7Y39Y@vamp.wpobr.mongodb.net/?retryWrites=true&w=majority&appName=vamp";


const client = new MongoClient(URL);
export const db = client.db("projetoVamp");
//const imagensCollections = await db.collection("imagens").find({}).toArray();

//console.log(imagensCollections);