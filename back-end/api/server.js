import express from "express";
import {db} from "./connect.js";
import path from "path";
import cors from "cors";

const __dirname = path.resolve();

const app = express();
const POST = 3001;

app.use(cors());
app.get('/', async(request, response)=>{

    response.send(await db.collection("imagens").find({}).toArray())

})

app.get('/contato', (request, response)=>{

    response.send("Página de contato")

})

app.use(express.static(path.join(__dirname, "../front-end/dist")));

app.get("*", async (request, response) => {
  response.sendFile(path.join(__dirname, "../front-end/dist/index.html"));
});

app.listen(POST, ()=>{

    console.log(`Servidor esta escutando na porta ${POST}`)

})