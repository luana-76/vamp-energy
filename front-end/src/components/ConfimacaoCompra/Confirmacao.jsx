import './confirmacaoStyle.css';
import Logo from '../../assets/logo.png';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Confirmacao() {

    const [img, setImg] = useState(Logo);  // Estado para a imagem
    const navigate = useNavigate();

    useEffect(() => {

        const timeout = setTimeout(() => {
            navigate('/produtos');
        }, 3000); // Redireciona após 3 segundos

        // Troca a imagem a cada 2 segundos
        const interval = setInterval(() => {
            
            setImg("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAqVJREFUSEvFlU1IVFEUx//nzZgTNW/EKPrOomgRGdW8KUmxFkHlJmpRm6JFYG0kCmzepDUiOFNQUIJUywqCFlEQBEKECka8CdwUlaYGY4sW4nsjxqRzT71hZvC9+XRCurt7OOf/O1/cS1jkQ4usj4KAexiunJH1kww+AsYuEGoAMJjGQWIIhNfVuvS8Gd7ZfInmBYRl7SiDegA2RQudEUF84Zrue5PLKScgJGvBv5neWED7BJha1Zj3tj0mC9AlRzoIfH0B4hlXAl/yG76782MtgLAcaWLwq3LEUzGCmBv8Md9gWiMDCK78uLwyPjMMYPU/AMzQL9UG7UwPPgMIeyIXmbmndHH+SaAnDFzO6jvjuD+mvDTtGUBI1szWNJUEIJ5wQGps1b3futzafSI0W+IYD9WYkrTNB0wAWFsUQDyRIOeBtqk930Pyh62AGLC3lYAhv6HstgN+AXBZNoBwi5nPAbQqZf8xR6K+Xd83lhLvB7DGnhQDkwFDWWEHGADcaWcGugOG0tLpeb/ZCRqAIE44HPVm5kmbkPpBWJ+nYkM1FI8d8BnA9kwAIwoJjaqujJqCSxw8e3VyfzTk0bZAoK+AuNn5T6rh3WEBdMnaUwJO24YVhWOuQZ2qGzftoap3NUg4BwqLJxUeq4Zy1g44Q8CjrJIZUakiUScEO0sUBxGf8uu+ZxbAHQwujcsVZps2Zu01MMaAE8CGolsGfF1mVNW2YFvcAjAvNz3aYcHoLUEkn4tglg4GYnvN1U2erMcuLEfaGNxZDoRALX7D221Z9VxCITnSDnBHrgTygBMEvmJ/SXNWkBZIvqwkHoBpXZFqRljw+cC0ry+XX8EvM4i3LpfsPsHAMRDXgrEp+WUCo8QUERL3/tanXwRxaC5fEv/30y9n0PaYP3779xn1hlLmAAAAAElFTkSuQmCC");
        }, 2200); // A imagem vai mudar após 2 segundos

        return () => {
            clearTimeout(timeout);
            clearInterval(interval);
        };
    }, [navigate]);

    return (
        <div id='divGeral'>
            <img src={img} alt="Logo ou Confirmação" />
        </div>
    );
}
