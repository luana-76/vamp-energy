import './styleFooter.css';

import Logo from '../../assets/logo.png';

export function Footer(){

    return(

        <footer>

            <div id='campoImagem'>

                <img src={Logo} alt='logo V'/>

            </div>

            <div id='campoInformacao'>

                <h3>Informações</h3>
                <p>Saiba sobre o projeto</p>
                
            </div>

            <div id='contatosDev'>

                <h3>Contatos</h3>

                <ul>

                    <li>Telefone: <a href='tel:0 0000-0000'>0 0000-0000</a></li>
                    <li>Email: <a href='mailto:luana_maria@hotmail.com'>luana_maria@hotmail.com</a></li>

                </ul>
                
            </div>

            <div id='navegacaoExternaSocial'>

                <a href='https://www.instagram.com/printf.luana._/'>

                    <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAmJJREFUSEvFlU2IT2EUxn8PiojZTFYYhUISIklYIKU0MZphsLHxsVDko8hCiQwhKwsW0vjIZ5QSOymJpBg0kZQNK7LydbyP3v/0d+d/m39qmru79573PM95nnPOK/r5UT/nZ2AAImICsANYAEyDUiIBvAAeACcldRcV6VVBRGwGTgFDgA/AI+B1iZSzgBnAWOAHsFXSmerYfwAiYnZO2AWslPS2Ho8iwlXeAsYBcyQ9q5wrAlwHlgOTJb3vK3lEbEjyHQC+pGo3Ak9SRTcltZQBOGmXJIP0PBExCFgKTAV+Aa+A+/nbXUspqSkiDNAoaXwZwFegU9KWSkBEWN/LwLxCRTb2bNL9EzBa0rmIsALLJI0oA/gNHJO02wGZ+UPAjHYC94DBmXkH4K5ZKMnd5HgTWS3JMX+fogcOPCxpbz7Qmtm3SrpSkK0teXUJaJZkgw1wMcnXJsmSlgJ0SNqTD5jlLmCkpG8FgEbgc2rng5L25/hOoF1SD/FaFXhgtucDRwDL1SDJ/lQbXwE4JGlfjj8PrO8L4ERK5il2yW63q1nXawWAdjdEQSK/r+nLg+oKrKVNbspS2WRP+BLgKPAGWFQw2Z4MK/PAOrtNN1W16Zhs5vwabbpW0seqWLfpYkkNZQBuu+6SQWsGVgDfgTvA7QrzKoCnwChJk8oArOGq1JpT6lkVBU+mp/31HLiQtuq6MoCZiaVZOLBF0ruCLDVf0wQ7+Y3s1VxJztF7DnLnVNa1DX6cJfGvn8DLNIhDgYnZbH8fDngL+/82SaerWdS80f7zwjlea70PzJVZj+71xvR7BX8AWsb9GfXCJjsAAAAASUVORK5CYII=' alt='Instagram'/>

                </a>

                <a href='https://www.linkedin.com/in/luanamaria-dev/'>

                    <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUJJREFUSEvtlc0qRlEUhp+HUkZkYqT8FANRMvJTBi5DbkAZKBMjc6Wk3IFchgykyFiS/I2MlAkDZbG1v6/jfKKcjwm7dp2zdvt91nrXPvvIDw9/WJ8GQET0A8/qVTPg7wARsQksZuF1dbkqpA6IiCHgtCTYq15XgXwF6KtqVdmiLWAhZ7yhLlXJPu39qMmDucnnVcUbABExCbRl4Uf1MD1HxBjQkeMP6tHrgegCpoERoBXYURuSKlt0C3RnoQt1IAP2gakcP3tlribBkgPPwIq6Vqz8O4A7oD3Pj1ycVXdrC98B1PYm0A0wCrQUSMmquaqAbXU+2zcD7BUAJ+pwVcCQmnrxNiIiVdKTX+/VzqqANvWpADgGxuuiWrf+sx5cquniSxkWT1EKtahRABwAE/+A2of2ly1qxu1Z1vj9n36zq3gBLPzRGctIENYAAAAASUVORK5CYII=' alt='Linkedin'/>

                </a>

                <a href='https://github.com/luana-76'>

                    <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAm9JREFUSEvFlU2IjlEUx39/kQ1ZIMkS5XOKZKGmiBI2hmKkKBn5Sk0yPko0+WgojeQj7AglzIYdCwuUiHyWSRYWPposTApxPGe6z3TfO8/7zjOLydm87z33f+7/nnPP+T9ikE2DfD41CcxsGLAcWALMBCZDT8wH4DlwJ/PfkPS72kWrEpjZIuAsMKmfLN8DmyTdLcIVEpjZbuBouG2ZKv4F9kg6noL7EJhZC9BW5tQCTLOk9thfQWBmCwBP1f1e3w3AFmA/MAToBLzeUwG/9RHgDHAKWBl89ZIe5CS9BGY2HHgFTAybrZIO+H8z83f4LOl7WI8Axkt6F9b7gMMh7jVQJ+mPr2OC1cC1KL12Sc1lSmVmx4BdEXaZJK9ABcFlYG0EmifpYUmCuqydn0XnnZa0PSXw8kzL05Q0vczhOcbMngCzw/pxlsHclOALMDYAOiQ1DJDgCrAmxHRJGpMSfMoGa1wA3JO0cIAEt4GlIaZb0siU4CkwKwC8W0bXkoCYPEjKV2BU8L+V5K1c8cgXgI1RYJOki2WyMLMm4HyEvSRpXUrgNb8JfAO6vc99/F2PJP0oIjIzn4dtYeB8EHNblTXJ9ZTAZ8I7aQKwGNgMrAd+halulPTTg0JJbgXc0IT8DTBDkk96pVyb2QqX36xUH4E5YfDmhyy2JnW/CjQWZNYgqSP3F4ndSWCH64+kQ9XewMwOZsn0SElkJzI52Rk7qsm1i1srcD8TsRfAS0nnkgx833G5tZSS6xxtZvWAS69PZ5skf/BeMzNX0r3AI8Bl2n/7WH+fTN/3T2anJM8kJpjisi3JH7uq/d+Pfq2bld37B8MT0hliYf0NAAAAAElFTkSuQmCC' alt='Github'/>

                </a>

            </div>

        </footer>

    )
}