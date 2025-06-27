import { useState } from 'react';
import './redefinicaoSenha.css';
import './responsiveSenha.css';
import adolescente from '../../assets/produto/adolescentes.png'
import tradicional from '../../assets/tradicional.png'

export function Redefinicao() {
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  function redefinirSenha() {
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    fetch('http://localhost:3000/redefinirSenha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, novaSenha }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert('Senha redefinida com sucesso!');
        } else {
          alert(data.error || 'Erro ao redefinir senha.');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao redefinir senha.');
      });
  }

  return (
    <main id='mainRedefinicao'>
      <form className='formRedefinicao' onSubmit={(e) => e.preventDefault()}>
        <h1>Redefinir Senha</h1>

        <label>Informe seu email</label>
        <input
          type='email'
          placeholder='Digite seu email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Nova senha</label>
        <input
          type='password'
          placeholder='Digite sua nova senha'
          required
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
        />

        <label>Confirmar senha</label>
        <input
          type='password'
          placeholder='Confirme a senha'
          required
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />

        <input type='button' value='Redefinir' onClick={redefinirSenha} />
      </form>
      <div id='imagemPart'>

        <img src={adolescente} alt='imagemAdo'/>
        <img src={tradicional} alt='imagemTradi'/>

      </div>
    </main>
  );
}
