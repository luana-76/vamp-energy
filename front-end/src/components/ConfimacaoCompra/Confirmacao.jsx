import './confirmacaoStyle.css'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function Confirmacao(){

    const navigate = useNavigate();

    {/* Faz voltar para página de compras depois de 4 segundos */}
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate('/produtos');
        }, 3000);

        return () => clearTimeout(timeout); // limpeza
    }, [navigate]);

    return(

        <div id='divGeral'>

            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAi1JREFUSEu1lc1rE1EUxc8bapJm3sNFK3XhJLpwYUXxc1FErFs34kZwZd0JQlyI4KKLioLYbUVw0wr+A1JwrS4UK4KopIIutJNQREPA5L5gas2RKVFCM52ZDvTuhnfe+d17585chS0OtcX+iAVUjRkjOUFgH4DRbkKLABaV48x5jcZCVJIbAspARrvubaXUNQDOBiZ/QE43rZ3aD6yEaUIBb4BtI1ovEDjcvbQMYF6RL6jUoxCjV57ISQWsrj8LBfha3wIwuSYmH7az2asr9fqv7a472lHqbVimBG4WRaZiAUv5/FHlOK+DthCYKYqUfGMmQM4A0BH97jjkkV3WvuvV9FXgu+4slLoE4FNb5GDWmAsg5xJO24OCyOVIwJLWLxUwBvKOZ+1kReufMZn3+j0viIxHV6B1DcAQgfMAygooJ8weBL4XRUbiAC0Ag0lN1+laBRE3DuAD8FIByK8Fa/dEvwNjnijyTCoA8Lggci4SUDHmOsnpNAAFlDyRYJz/R9+YVo0Z6pDfAAxsEtIazOV27qjVmpGA4NDX+h6AK5sBKPKuZ+2N2C85ECwbM7xKfgQwnBDitzOZA3vr9UYiwFoV+fxxOM4zAPkoCIGmQ57wrP0QpovcB1XXPdRRaj5ibD93gLO7RYJqQyN24XwBcgPGlEhe7Fk470nO/rD2/jHgd1SFsYB/lytajxN4Gjwr4LQnErQvNhIDfK0Dw1Ndx76fWuoWxaYYI0hcQVrQX8hmwhn5tJpNAAAAAElFTkSuQmCC"/>

        </div>

    )

}