// Fetch ou Axios
import axios from "axios";

const URL = "localhost:3001";

const responseImagens = await axios.get(`${URL}/imagens`);


export const imagensArray = responseImagens.data;
