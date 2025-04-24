import './styleQr.css'; 
import QrCode from '../../../assets/produto/qr.jpeg';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function PagamentoQr({ fechar }) {
    
  const [tempo, setTempo] = useState(600);

  // Formatando o tempo
  useEffect(() => {
    const intervalo = setInterval(() => {
      setTempo((prevTempo) => {
        if (prevTempo <= 1) {
          clearInterval(intervalo);
          return 0;
        }
        return prevTempo - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
  }

  return (
    <div className="overlay">
      <div id='caixaPrincipalQr'>
        <div id="close" onClick={fechar} style={{ cursor: 'pointer' }}>
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARlJREFUSEvt1M8qxUEYxvHP2SrZEMpCUlyD/Cls5TZkq9yJzsZKuQG5AmSFbP3JmiVX4PfWqF/6nZlx6mRzZjm98zzv8513pmfEqzdifWODIuF/R3SMM7wPaHUFGzgdFCWX4BAneMFmh8kyrjGHfVx0meQM4mAIhNBr6vQnyRJuMYtHbOHrrwZR32UyUSseAjWXPI+rlOQJU8n4vkm4g8/cKNUYxPmFhGsxiWWxtA1rDYJ1MA/2sR6aVNul7msRhfhNQvScEMXeXbO/WzIpJWh3/oY1TLbGs5gkZ9Al/pEQxegGspkSrpzBQTPnfQSWmPPfr3k1JZnGHi6HeQdHOM98FWGyPuxXUfwpawpKl1yjka0ZGxQRjhzRNxi0NBmpupZSAAAAAElFTkSuQmCC" alt="fechar" />
        </div>

        <div className='chavesPix'>
          <img src={QrCode} id='qrCode' alt='qr' />
          <div className='chaveAleatoria'>c1f5f4a8-1e9d-4f36-9bba-2a6e8e4c7d92</div>

          <div>
            <div className='animacaoPix'>
              <div className='marcadoProgresso'></div>
            </div>
            <span className='tempo'>{formatarTempo(tempo)}</span>
          </div>
        </div>

        <div>
          <p>Pague suas compras com QrCode ou com a chave aleatória acima para obter suas compras.</p>
        </div>
      </div>
    </div>
  );
}


//Consertando erro de prop
PagamentoQr.propTypes = {
    fechar: PropTypes.func.isRequired,
};
