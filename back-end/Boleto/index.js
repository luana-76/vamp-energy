import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';

 const app = express();
 const PORT = 3001;
 
 app.use(cors());
 
 app.post('/gerar-boleto', async (req, res) => {
   try {
     //const browser = await puppeteer.launch({ headless: false });

      const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

     const page = await browser.newPage();

     await page.setUserAgent('Mozilla/5.0 ...');
 
     await page.goto('https://devtools.com.br/gerador-boleto/', {
       waitUntil: 'load',
       timeout: 180000,
     });
 
     await page.evaluate(() => {
       const inputs = document.querySelectorAll('input[type="text"], input:not([type])');
       inputs.forEach(input => input.value = '');
     });
 
     await page.type('#sacado', 'Luana Maria de Santana Souza');
     await page.type('#endereco1', 'Comandante Reis - n 56 Pau amarelo');
     await page.type('#endereco2', 'Paulista - Pernambuco');
     await page.type('#demonstrativo1', 'Vamp Energy');
     await page.type('#instrucoes3', 'Pagamento de boleto vencido, cobrar 20%  do valor a mais.');
     await page.type('#quantidade', '1');
     await page.type('#valor_unitario', 'R$ 3,0');
     await page.type('#cedente', 'Vamp Energy');
     await page.type('#endereco', 'Rua Atraversia Rural n 572 Recife');
     await page.type('#cidade_uf', 'Recife Centro');
     await page.type('#valor_cobrado', 'R$ 3,0');
 
     await page.click('[type="submit"]');
 
     await browser.close();
   } catch (error) {
     console.error('Erro ao gerar boleto:', error);
     res.status(500).json({ error: 'Erro ao gerar boleto' });
   }
 });
 
 app.listen(PORT, () => {
   console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
 });