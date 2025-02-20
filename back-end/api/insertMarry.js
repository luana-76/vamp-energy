import {imagensArray} from "../../front-end/src/assets/database/imagens.js";
import {db} from "./connect.js";

const newImagensArray = imagensArray.map((currentImagensObj) =>{

    const newImagensObj = {...currentImagensObj}
    delete newImagensObj.id
    
    return newImagensObj

})

const responseImagens = await db.collection("imagens").insertMany(newImagensArray);

console.log(imagensArray)