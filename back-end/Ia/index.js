const { GoogleGenerativeAI } = require("@google/generative-ai");

// Passa a chave diretamente aqui
const genAI = new GoogleGenerativeAI("AIzaSyCLuo02ZiVj-NB94pFjahWxEof-7dizTnM");

async function main() {
  // Seleciona o modelo
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  // Faz a requisição
  const result = await model.generateContent("Olá, Gemini! Como você está hoje?");

  // Mostra o texto gerado
  console.log(result.response.text());
}

main().catch(console.error);
