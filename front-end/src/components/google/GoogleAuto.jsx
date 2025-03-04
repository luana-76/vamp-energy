import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

// eslint-disable-next-line react/prop-types
export function GoogleAut(){

    return(

        <GoogleLogin
        onSuccess={(response)=>{

            const codigoDecodificado = jwtDecode(response?.credential)
            console.log(`Concluido!, ${codigoDecodificado}`)

        }}

        onError={()=>{}}
            
        />

    )

}